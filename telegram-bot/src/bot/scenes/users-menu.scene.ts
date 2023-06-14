import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';

@Scene(USERS_SCENE.MENU)
export class UserMenuScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      await ctx.reply('🍱')
      await ctx.reply(
         'Выберите раздел:',
         this.navigationKeyboard.mainMenu()
      )
   }
   // 🗓 Еженедельное меню
   @Hears(USERS_BUTTON.MENU.WEEKLY.TEXT)
   weeklyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_WEEKLY)
   }
   // 🗓 Еженедельное меню 2
   @Hears(USERS_BUTTON.MENU.WEEKLY2.TEXT)
   weekly2MenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_WEEKLY2)
   }
   // 🗓 Дневное меню
   @Hears(USERS_BUTTON.MENU.DAILY.TEXT)
   dailyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_DAILY)
   }
   // 🍖 Гриль меню
   @Hears(USERS_BUTTON.MENU.GRILL.TEXT)
   grillMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_GRILL)
   }
   // ☕️ Кофейное меню
   @Hears(USERS_BUTTON.MENU.COFFEE.TEXT)
   coffeeMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_COFFEE)
   }
   // 👈 Назад
   @Hears(USERS_BUTTON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
}