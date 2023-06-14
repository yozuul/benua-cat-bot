import { resolve } from 'path';
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';

@Scene(USERS_SCENE.MENU_WEEKLY)
export class UserMenuWeeklyScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext) {
      await ctx.reply(
         'Меню на неделю:',
         this.navigationKeyboard.backButton()
      )
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/1_3f130403b9.png')
      })
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/2_4a814e2c52.png')
      })
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/3_997d06ef8f.png')
      })
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/4_3be7c754c4.png')
      })
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/5_bd1ed10dbf.png')
      })
   }
   @Hears('🗓 Еженедельное меню')
   weeklyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      // ctx.scene.enter(USERS_SCENE.WEEKLY)
   }
   @Hears(USERS_BUTTON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU)
   }
}