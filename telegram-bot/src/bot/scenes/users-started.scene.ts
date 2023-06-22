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
      await ctx.reply(
         'Выберите интересующий раздел:',
         this.navigationKeyboard.startedUsers()
      )
   }
   // Заказ на гриле
   @Hears(USERS_BUTTON.STARTED.GRILL_MENU_ORDER.TEXT)
   async grillOrderSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.MENU_GRILL_ORDER)
   }
   // Оставить отзыв
   @Hears(USERS_BUTTON.STARTED.FEEDBACK.TEXT)
   async feedbackSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.reply('Вы можете оставить свой отзыв в нашей группе: https://t.me/awsdfasfasf')
   }
   // КБЖУ
   @Hears(USERS_BUTTON.STARTED.KBZHU.TEXT)
   async kbzhuSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.KBZHU)
   }
   // Меню
   @Hears(USERS_BUTTON.STARTED.MENU.TEXT)
   async menuSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
   // О нас
   @Hears(USERS_BUTTON.STARTED.ABOUT.TEXT)
   async aboutSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.ABOUT)
   }
   // Акции
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
}