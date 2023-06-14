import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_BUTTON,  USERS_SCENE } from '@app/common/constants'

import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard } from '../keyboards/navigation-keyboards'


@Scene(USERS_SCENE.STARTED)
export class UserStartedScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard,
   ) {}

   @Start()
   async onStart(@Ctx() ctx: SessionContext, @Sender('id') tgId) {
      await ctx.reply(
         'Добро пожаловать в наш Телеграм бот!\nТут можно заказать гриль-меню, ознакомиться с меню недели, узнать калорийность любого блюда, узнать об акциях'
      )
      await ctx.scene.enter(USERS_SCENE.STARTED)
   }

   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext, @Sender('id') tgId) {
      console.log('Enter Scene ::', USERS_SCENE.STARTED)
      await ctx.reply(
         'Выберите интересующий раздел:',
         this.navigationKeyboard.startedUsers()
      )
   }
   // 🍱 Меню
   @Hears(USERS_BUTTON.STARTED.MENU.TEXT)
   async menuSceneHandler(@Ctx() ctx: SessionContext) {
      console.log('SERS_SCENE.MENU', USERS_SCENE.MENU)
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
   // 🏵 КБЖУ
   @Hears(USERS_BUTTON.STARTED.KBZHU.TEXT)
   async kbzhuSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.KBZHU)
   }
   // 🐱 О нас
   @Hears(USERS_BUTTON.STARTED.ABOUT.TEXT)
   async aboutSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.ABOUT)
   }
   // 🏷 Акции
   @Hears(USERS_BUTTON.STARTED.PROMO.TEXT)
   async actionSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.PROMO)
   }
   @On('new_chat_members')
   async msgChantMemeber(@Ctx() ctx: SessionContext) {
      console.log(ctx)
   }
   @On('my_chat_member')
   async myChantMemeber(@Ctx() ctx: SessionContext) {
      console.log(ctx)
   }
   cleanSession(ctx) {
      ctx.session.cart = {
         db_products: [],
         added_products: [], summ: 0, orderText: null,
         container_id: 'container_1',
         day: 'day_near', time: null
      }
   }
}