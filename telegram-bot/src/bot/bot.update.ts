import { Injectable } from '@nestjs/common'
import { Ctx, On, Start, Update, Sender, Hears } from 'nestjs-telegraf'
import { SessionContext } from '@app/common/interfaces'

import { SceneContext } from '@app/common/interfaces'
import { USERS_BUTTON, USERS_SCENE } from '@app/common/constants'
import { NavigationKeyboard, editGrillMenu, generateGrillMenu } from '@bot/keyboards'
import { CartRepo, DishRepo, GuestRepo } from '@app/database/repo'
import { cleanTrash } from '@app/common/utils'

@Injectable()
@Update()
export class BotUpdate {
   constructor(
      private dishRepo: DishRepo,
      private guestRepo: GuestRepo,
      private cartRepo: CartRepo,
      private navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async startCommand(ctx: SceneContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @On('callback_query')
   async handleNonSceneCallback(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const queryData = ctx.callbackQuery['data']
      if(queryData === 'to_grill_order_action') {
         await cleanTrash(tg_id, ctx)
      }
      if(queryData.includes('menu_grill')) {
         const grillType = queryData.split('menu_grill_')[1]
         const dishes = await this.dishRepo.getByCategory(grillType)
         const carts = await this.cartRepo.findCartByTgId(tg_id)
         await generateGrillMenu(dishes, carts, ctx)
         await ctx.answerCbQuery()
      }
      if(queryData.includes('to_cart_action')) {
         await cleanTrash(tg_id, ctx)
         await ctx.scene.enter(USERS_SCENE.CART)
         await ctx.answerCbQuery()
      }
      if(queryData.includes('plus') || queryData.includes('minus')) {
         await this.calcCart(ctx, tg_id)
         await ctx.answerCbQuery()
      }
      if(queryData === 'disable_newsletters') {
         await this.guestRepo.toggleNewletterSigned(tg_id, false)
         await ctx.answerCbQuery('Вы успешно отписались от рассылки')
      }
   }
   async calcCart(ctx, tg_id) {
      let updateMenu = true
      const query = ctx.callbackQuery
      const queryData = query['data']
      const keyboardId = query.message.message_id

      const [operation, id] = queryData.split('_')
      const dish = await this.dishRepo.findById(id)
      const guest = await this.guestRepo.findCreate(tg_id, query.from.first_name)
      const cart = await this.cartRepo.findCart(guest.id)

      if(cart.length === 0 && operation === 'plus') {
         try {
            await this.cartRepo.pushItem(guest.id, dish.id, 1)
         } catch (error) {
            await ctx.reply('Карточка устарела')
            try {
               await ctx.deleteMessage()
            } catch (error) {
               console.log(error)
            }
         }
      }
      if(cart.length > 0) {
         const existDish = cart.find((cartDish) => cartDish.dish_id === dish.id)
         if(existDish) {
            if(operation === 'plus') {
               existDish.quantity += 1
            }
            if(operation === 'minus') {
               existDish.quantity -= 1
               if(ctx.session.__scenes.current === 'USER_CART_SCENE' && existDish.quantity === 0) {
                  await ctx.deleteMessage()
                  ctx.session.cart = ctx.session.cart.filter((cart_id) => cart_id !== keyboardId)
               }
            }
            if(existDish.quantity === 0) {
               await this.cartRepo.deleteItem(existDish.id)
            }
            if(existDish.quantity > 0) {
               await this.cartRepo.updateItem(existDish.id, existDish.quantity)
            }
         } else {
            if(operation === 'plus') {
               await this.cartRepo.pushItem(guest.id, dish.id, 1)
            } else {
               updateMenu = false
            }
         }
      }
      const allCarts = await this.cartRepo.findCartByTgId(tg_id)
      if(updateMenu) {
         await editGrillMenu(tg_id, keyboardId, dish, allCarts, ctx)
      }
      if(ctx.session.__scenes.current === USERS_SCENE.CART) {
         console.log(ctx.session)
         if(ctx.session?.cart?.length === 0) {
            await ctx.reply('В корзине нет товаров', this.navigationKeyboard.backButton())
         }
      }
      try {
         await ctx.answerCbQuery('')
      } catch (error) {
         await ctx.scene.enter(USERS_SCENE.MENU_GRILL_ORDER)
         await ctx.answerCbQuery('')
      }
   }

   @Hears(USERS_BUTTON.STARTED.GRILL_MENU_ORDER.TEXT)
   async grillMenuSceneHandler(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await cleanTrash(tg_id, ctx)
      await ctx.scene.enter(USERS_SCENE.MENU_GRILL_ORDER)
   }
   @Hears(USERS_BUTTON.STARTED.CART.TEXT)
   async cartMenuSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.CART)
   }


}
