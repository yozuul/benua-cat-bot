import { resolve } from 'path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard, generateGrillMenu } from '@bot/keyboards'
import { CartRepo, DishRepo, GuestRepo, OrdersRepo } from '@app/database/repo'
import { IikoService } from 'src/iiko/iiko.service'
import {cleanTrash} from '@app/common/utils'

@Scene(USERS_SCENE.CART)
export class UserCartScene {
   constructor(
      private iikoService: IikoService,
      private cartRepo: CartRepo,
      private dishRepo: DishRepo,
      private orderRepo: OrdersRepo,
      private guestRepo: GuestRepo,
      private readonly navigationKeyboard: NavigationKeyboard,
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      ctx.session.cart = []
      const carts = await this.cartRepo.findCartByTgId(tg_id)
      if(carts.length === 0) {
         const { message_id } = await ctx.reply(
            'В корзине нет товаров',
            this.navigationKeyboard.backGrillOrderButton()
         )
         ctx.session.trash.push(message_id)
         return
      }
      if(carts.length > 0) {
         const { message_id } = await ctx.reply('КОРЗИНА',
            this.navigationKeyboard.cartButton()
         )
         ctx.session.trash.push(message_id)
      }
      const dishes = []
      for (let dish of carts) {
         const existDish = await this.dishRepo.findById(dish.dish_id)
         dishes.push({
            name: existDish.name,
            ingredients: existDish.ingredients,
            kbzhu: existDish.kbzhu,
            weight: existDish.weight,
            price: existDish.price,
            photo: existDish.photo_url,
            iiko_id: existDish.iiko_id,
            dish_id: existDish.id
         })
      }
      await generateGrillMenu(dishes, carts, ctx)
   }

   @Hears(USERS_BUTTON.CART.ORDER.TEXT)
   async makeOrder(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      let summ = 0
      const cartItems = []
      const dishesIds = []
      const userCarts = await this.cartRepo.findCartByTgId(tg_id)
      if(userCarts.length === 0)  return
      for (let cartDish of userCarts) {
         const dish = await this.dishRepo.findById(cartDish.dish_id)
         summ += cartDish.quantity * dish.price
         cartItems.push({
            productId: dish.iiko_id,
            type: 'Product',
            amount: cartDish.quantity
         })
         dishesIds.push(dish.id)
      }
      try {
         const guest = await this.guestRepo.find(tg_id)
         const iikoOrder = await this.iikoService.createOrder(cartItems, summ, guest)
         await this.orderRepo.createOrder(iikoOrder, guest, dishesIds)
         await this.cleanCart(ctx, tg_id)
         await this.cartRepo.cleanCart(tg_id)
         await cleanTrash(tg_id, ctx)
         // await ctx.reply('Спасибо за заказ\nВы получите уведомление по его готовности')
         // await ctx.scene.enter(USERS_SCENE.STARTED)
      } catch (error) {
         console.log(error)
         await ctx.reply('Не смогли добавить заказ')
         console.log('Ошибка создания заказа')
      }
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await this.cleanCart(ctx, tg_id)
      await cleanTrash(tg_id, ctx)
      await ctx.scene.enter(USERS_SCENE.STARTED)
   }

   @Hears(USERS_BUTTON.CART.CLEAN.TEXT)
   async cleanCartButton(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await this.cleanCart(ctx, tg_id)
      await this.cartRepo.cleanCart(tg_id)
      await ctx.scene.enter(USERS_SCENE.MENU_GRILL_ORDER)
   }

   @Hears(USERS_BUTTON.STARTED.GRILL_MENU_ORDER.TEXT)
   async orderGrill(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await ctx.scene.enter(USERS_SCENE.MENU_GRILL_ORDER)
   }

   async cleanCart(ctx, tg_id) {
      if(!ctx.session?.cart) {
         ctx.session.cart = []
         return
      }
      if(ctx.session.cart?.length > 0) {
         ctx.session.cart.map(async (messageId) => {
            try {
               await ctx.telegram.deleteMessage(tg_id, messageId)
            } catch (error) {
               console.log('Ошибка удаления меню')
            }
         })
      }
      ctx.session.cart = []
   }
}