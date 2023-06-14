import { Injectable } from '@nestjs/common'
import { Ctx, On, Start, Update, Sender } from 'nestjs-telegraf'
import { SessionContext } from '@app/common/interfaces'

import { SceneContext } from '@app/common/interfaces'
import { USERS_SCENE } from '@app/common/constants'
import { NavigationKeyboard, editGrillMenu } from '@bot/keyboards'
import { CartRepo, DishRepo, GuestRepo } from '@app/database/repo'

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
      if(queryData.includes('to_cart_action')) {
         await ctx.scene.enter(USERS_SCENE.CART)
      }
      if(queryData.includes('plus') || queryData.includes('minus')) {
         await this.calcCart(ctx, tg_id)
      }
   }
   async calcCart(ctx, tg_id) {
      const query = ctx.callbackQuery
      const queryData = query['data']
      const keyboardId = query.message.message_id

      const [operation, id] = queryData.split('_')
      const dish = await this.dishRepo.findById(id)
      const guest = await this.guestRepo.findCreate(tg_id, query.from.first_name)
      const cart = await this.cartRepo.findCart(guest.id)

      if(cart.length === 0 && operation === 'plus') {
         await this.cartRepo.pushItem(guest.id, dish.id, 1)
      }
      if(cart.length > 0) {
         const existDish = cart.find((cartDish) => cartDish.dish_id === dish.id)
         if(existDish) {
            if(operation === 'plus') {
               existDish.quantity += 1
            }
            if(operation === 'minus') {
               existDish.quantity -= 1
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
            }
         }
      }
      const allCarts = await this.cartRepo.findCartByTgId(tg_id)
      await editGrillMenu(tg_id, keyboardId, dish, allCarts, ctx)
      await ctx.answerCbQuery('')
   }
}