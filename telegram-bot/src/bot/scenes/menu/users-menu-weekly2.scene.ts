import { resolve } from 'path';
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';

@Scene(USERS_SCENE.MENU_WEEKLY2)
export class UserMenuWeekly2Scene {
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
      await ctx.replyWithPhoto(
         { source: resolve('../dashboard/public/uploads/medium_all_d244862adc.png') }
      )
   }
   @Hears(USERS_BUTTON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU)
   }
}