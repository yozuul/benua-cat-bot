import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';
import { FilesRelatedMorph } from '@app/database/repo';

@Scene(USERS_SCENE.MENU)
export class UserMenuScene {
   constructor(
      private filesReletedMorphs: FilesRelatedMorph,
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
   // Еженедельное меню
   @Hears(USERS_BUTTON.MENU.WEEKLY.TEXT)
   async weeklyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      let fileUrl = null
      await ctx.reply('МЕНЮ НЕДЕЛИ')
      const fileData = await this.filesReletedMorphs.findFileUrlByFieldName('weekly_menu_image')
      if(fileData?.url) {
         fileUrl = '../dashboard/public' + fileData.url
      } else {
         ctx.reply('Данные не загружены')
      }
      if(fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            try {
               await ctx.telegram.sendMessage(
                  258644975, 'Рамзер изображения слишком большой'
               )
               await ctx.telegram.sendMessage(
                  1884297416, 'Рамзер изображения слишком большой'
               )
            } catch (error) {
               console.log('error')
            }
         }
      }
      // ctx.scene.enter(USERS_SCENE.MENU_WEEKLY)
   }
   // Меню на день
   @Hears(USERS_BUTTON.MENU.DAYLY.TEXT)
   async daylyMenuSceneHandler(@Ctx() ctx: SessionContext) {
      let fileUrl = null
      await ctx.reply('МЕНЮ НА ДЕНЬ')
      const fileData = await this.filesReletedMorphs.findFileUrlByFieldName('dayly_menu_image')
      if(fileData?.url) {
         fileUrl = '../dashboard/public' + fileData.url
      } else {
         ctx.reply('Данные не загружены')
      }
      if(fileUrl) {
         try {
            await ctx.replyWithDocument({ source: fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
         }
      }
      // ctx.scene.enter(USERS_SCENE.MENU_WEEKLY)
   }
   // Гриль меню
   @Hears(USERS_BUTTON.MENU.GRILL.TEXT)
   async grillMenuSceneHandler(@Ctx() ctx: SessionContext) {
      let fileUrl = null
      await ctx.reply('ГРИЛЬ МЕНЮ')
      const fileData = await this.filesReletedMorphs.findFileUrlByFieldName('grill_menu_image')
      if(fileData?.url) {
         fileUrl = '../dashboard/public' + fileData.url
      } else {
         ctx.reply('Данные не загружены')
      }
      if(fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
         }
      }
      // ctx.scene.enter(USERS_SCENE.MENU_GRILL)
   }
   // Кофейное меню
   @Hears(USERS_BUTTON.MENU.DRINKS.TEXT)
   async coffeeMenuSceneHandler(@Ctx() ctx: SessionContext) {
      let fileUrl = null
      await ctx.reply('КОФЕ И ГОРЯИЧЕ НАПИТКИ')
      const fileData = await this.filesReletedMorphs.findFileUrlByFieldName('coffe_menu_image')
      if(fileData?.url) {
         fileUrl = '../dashboard/public' + fileData.url
      } else {
         ctx.reply('Данные не загружены')
      }
      if(fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            try {
               await ctx.telegram.sendMessage(
                  258644975, 'Рамзер изображения слишком большой'
               )
               await ctx.telegram.sendMessage(
                  1884297416, 'Рамзер изображения слишком большой'
               )
            } catch (error) {
               console.log('error')
            }
         }
      }
      // ctx.scene.enter(USERS_SCENE.MENU_COFFEE)
   }
   // Назад
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
}