import { resolve } from 'path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'

import { NavigationKeyboard } from '@bot/keyboards'
import { GuestRepo } from '@app/database/repo'
import { BotService } from '../bot.service'

@Scene(USERS_SCENE.PROMO)
export class UserPromoScene {
   constructor(
      private guestRepo: GuestRepo,
      private navigationKeyboard: NavigationKeyboard,
      private botService: BotService
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const checkUser = await this.guestRepo.findByTgId(tg_id)
      await ctx.reply('НОВОСТИ И АКЦИИ',
         this.navigationKeyboard.newsButton(checkUser.signed_newsletter)
      )
      await this.botService.checkNewMessage(tg_id, true)
   }
   @Hears(USERS_BUTTON.NEWS.SIGNED.TEXT)
   async signedNewsLrtters(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await this.guestRepo.toggleNewletterSigned(tg_id, false)
      const checkUser = await this.guestRepo.findByTgId(tg_id)
      await ctx.reply('Вы успешно отписались от рассылки',
         this.navigationKeyboard.newsButton(checkUser.signed_newsletter)
      )
   }
   @Hears(USERS_BUTTON.NEWS.NOT_SIGNED.TEXT)
   async unSignedNewsLrtters(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await this.guestRepo.toggleNewletterSigned(tg_id, true)
      const checkUser = await this.guestRepo.findByTgId(tg_id)
      await ctx.reply('Вы подписались на рассылку',
         this.navigationKeyboard.newsButton(checkUser.signed_newsletter)
      )
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.STARTED)
   }
}