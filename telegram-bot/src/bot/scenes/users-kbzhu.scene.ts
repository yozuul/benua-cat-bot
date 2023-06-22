import { resolve } from 'node:path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender, Message } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard } from '@bot/keyboards'
import { DishRepo } from '@app/database/repo'

@Scene(USERS_SCENE.KBZHU)
export class UserKbzhuScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard,
      private dishRepo: DishRepo
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      await ctx.reply(
         'Укажите название блюда, чтобы узнать его состав и энергетическую ценность',
         this.navigationKeyboard.backButton()
      )
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @On('message')
   // (@Sender('id') senderId: number)
   async onSceneEnter(@Message('text') text: string, @Ctx() ctx: SessionContext) {
      const splitted = []
      let message = ''
      const founded = await this.dishRepo.findDish(text)
      if(founded.length === 0) {
         await ctx.reply(
            'Блюд не найдено, попробуйте сформулировать запрос по другому',
            this.navigationKeyboard.backButton()
         )
         return
      }
      let currentIndex = 0
      if(founded.length > 0) {
         await ctx.reply('Вот что удалось найти:',
            this.navigationKeyboard.backButton()
         )
      }
      for (let dish of founded) {
         message += `<b>${dish.name}</b>\n`
         message += `${dish.price} руб. | ${dish.weight} гр.\n`
         // message += `<pre>${dish.category}</pre>\n`
         message += `${dish.kbzhu}\n`
         message += `${dish.ingredients}\n`
         currentIndex ++
         if(currentIndex !== 9) {
            message += `---\n`
         }
         if(currentIndex === 9) {
            splitted.push(message)
            currentIndex = 0
            message = ''
         }
      }
      if(splitted.length >= 1) {
         for (let dish of splitted) {
            await ctx.reply(dish, {
               parse_mode: 'HTML'
            })
         }
      } else {
         await ctx.reply(message, {
            parse_mode: 'HTML',
         })
      }
   }
}
