import { resolve } from 'node:path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard, generateGrillMenu, grillMenuKeyboard } from '@bot/keyboards'
import { CartRepo, DishRepo } from '@app/database/repo'
import { cleanTrash } from '@app/common/utils'

@Scene(USERS_SCENE.MENU_GRILL_ORDER)
export class UserMenuGrillOrderScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard,
      private dishRepo: DishRepo,
      private cartRepo: CartRepo,
   ) {}
   // --------------
   @Start()
   async onStart(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await cleanTrash(tg_id, ctx)
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext) {
      await ctx.reply('ГРИЛЬ МЕНЮ',
         this.navigationKeyboard.backCartButton()
      )
      const menuKeyboard = grillMenuKeyboard(USERS_BUTTON.MENU_GRILL);
      await ctx.reply(
         'Выберите категорию:', menuKeyboard
      )
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      await cleanTrash(tg_id, ctx)
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
}