import { resolve } from 'path';
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';
import { FilesRelatedMorph } from '@app/database/repo';

@Scene(USERS_SCENE.MENU)
export class UserMenuScene {
   fileUrl = null
   constructor(
      private filesReletedMorphs: FilesRelatedMorph,
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext) {
      await ctx.reply(
         'Выберите раздел:',
         this.navigationKeyboard.mainMenu()
      )
   }
   // Еженедельное меню
   @Hears(USERS_BUTTON.MENU.WEEKLY.TEXT)
   async showWeeklyMenu(@Ctx() ctx: SessionContext) {
      await ctx.reply('МЕНЮ НЕДЕЛИ')
      await this.getFilePath('weekly_menu_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: this.fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   // Меню на день
   @Hears(USERS_BUTTON.MENU.DAYLY.TEXT)
   async showDaylyMenu(@Ctx() ctx: SessionContext) {
      await ctx.reply('МЕНЮ НА ДЕНЬ')
      await this.getFilePath('dayly_menu_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithDocument({ source: this.fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   // Гриль
   @Hears(USERS_BUTTON.MENU.GRILL.TEXT)
   async showGrillMenu(@Ctx() ctx: SessionContext) {
      await this.getFilePath('grill_menu_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: this.fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   // Гриль завтрак
   @Hears(USERS_BUTTON.MENU.GRILL_BREAKFAST.TEXT)
   async showGrillBreakfastMenu(@Ctx() ctx: SessionContext) {
      await this.getFilePath('grill_breakfast_menu_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: this.fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   // Напитки
   @Hears(USERS_BUTTON.MENU.DRINKS.TEXT)
   async showCoffeeMenu(@Ctx() ctx: SessionContext) {
      await this.getFilePath('coffe_menu_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({ source: this.fileUrl })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   // Назад
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   async getFilePath(file_type, ctx) {
      this.fileUrl = null
      const fileData = await this.filesReletedMorphs.findFileUrlByFieldName(file_type)
      if(fileData?.url) {
         this.fileUrl = resolve('../dashboard/public' + fileData.url)
      } else {
         ctx.reply('Данные не загружены')
      }
   }
   async sendErrorMessage(ctx) {
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