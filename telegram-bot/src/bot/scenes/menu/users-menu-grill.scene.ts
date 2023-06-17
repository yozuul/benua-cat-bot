import { resolve } from 'node:path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard, generateGrillMenu } from '@bot/keyboards'
import { CartRepo, DishRepo } from '@app/database/repo'

@Scene(USERS_SCENE.MENU_GRILL)
export class UserMenuGrillScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard,
      private dishRepo: DishRepo,
      private cartRepo: CartRepo,
   ) {}
   // --------------
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      await ctx.reply('🍖',
         this.navigationKeyboard.backButton()
      )
      await ctx.reply(
         'Выберите гриль меню:',
         this.navigationKeyboard.grillMenu()
      )
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
}