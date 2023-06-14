import { resolve } from 'path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard } from '@bot/keyboards'

@Scene(USERS_SCENE.PROMO)
export class UserPromoScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      await ctx.reply('🏷',
         this.navigationKeyboard.backButton()
      )
      await ctx.replyWithPhoto(
         {
            source: resolve('../dashboard/public/uploads/medium_1627975108174692185_9c398613cf.jpg'),
         },
         {
            caption: '<b>Это заголовок</b>\nТут текст, но он не сможет поддерживать всё форматирование представленное в редакторе.\nТак в телеграме это работает',
            parse_mode: 'HTML'
         }
      )
   }
   @Hears(USERS_BUTTON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
}