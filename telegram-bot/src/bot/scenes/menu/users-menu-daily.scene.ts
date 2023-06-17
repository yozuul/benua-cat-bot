import { resolve } from 'path';
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';

@Scene(USERS_SCENE.MENU_DAILY)
export class UserMenuDailyScene {
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
         'Меню на вторник:',
         this.navigationKeyboard.backButton()
      )
      await ctx.replyWithPhoto(
         { source: resolve('../dashboard/public/uploads/2_4a814e2c52.png') },
         {
            reply_markup: {
               inline_keyboard: [
                  [
                     { text: 'Пн', callback_data: `select_containers` },
                     { text: '🟢 Вт', callback_data: `submit_order2` },
                     { text: 'Ср', callback_data: `submit_order3` },
                     { text: 'Чт', callback_data: `submit_order4` },
                     { text: 'Пт', callback_data: `submit_order5` },
                  ]

               ]
            }
         },
      )
   }
   @Hears('🗓 Еженедельное меню')
   weeklyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      // ctx.scene.enter(USERS_SCENE.WEEKLY)
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU)
   }
}