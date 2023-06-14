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
   // Завтрак (до 12:00)
   @Hears(USERS_BUTTON.MENU_GRILL.BREAKFAST.TEXT)
   async getBreakfast(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const dishes = await this.dishRepo.getByCategory('breakfast')
      const carts = await this.cartRepo.findCartByTgId(tg_id)
      generateGrillMenu(dishes, carts, ctx)

   }
   // Основные блюда
   @Hears(USERS_BUTTON.MENU_GRILL.MAIN.TEXT)
   async getMain(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const dishes = await this.dishRepo.getByCategory('main')
      const carts = await this.cartRepo.findCartByTgId(tg_id)
      generateGrillMenu(dishes, carts, ctx)
   }
   // Гарниры
   @Hears(USERS_BUTTON.MENU_GRILL.GARNISH.TEXT)
   async getGarnish(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const dishes = await this.dishRepo.getByCategory('garnish')
      const carts = await this.cartRepo.findCartByTgId(tg_id)
      generateGrillMenu(dishes, carts, ctx)
   }
   // Соусы
   @Hears(USERS_BUTTON.MENU_GRILL.SAUSE.TEXT)
   async getSause(@Ctx() ctx: SessionContext, @Sender('id') tg_id: number) {
      const dishes = await this.dishRepo.getByCategory('sause')
      const carts = await this.cartRepo.findCartByTgId(tg_id)
      generateGrillMenu(dishes, carts, ctx)
   }
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
         'Выберите раздел:',
         this.navigationKeyboard.grillMenu()
      )
   }
   @Hears(USERS_BUTTON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
}