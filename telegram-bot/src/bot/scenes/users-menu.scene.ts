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
      await ctx.reply(
         'Выберите раздел:',
         this.navigationKeyboard.mainMenu()
      )
   }
   // Гриль меню
   @Hears(USERS_BUTTON.MENU.GRILL.TEXT)
   grillMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_GRILL)
   }
   // Еженедельное меню
   @Hears(USERS_BUTTON.MENU.WEEKLY.TEXT)
   weeklyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_WEEKLY)
   }
   // КБЖУ
   @Hears(USERS_BUTTON.MENU.KBZHU.TEXT)
   kbzhuMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.KBZHU)
   }
   // Кофейное меню
   @Hears(USERS_BUTTON.MENU.COFFEE.TEXT)
   coffeeMenuSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU_COFFEE)
   }
   // Назад
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
}