import { resolve } from 'path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard } from '@bot/keyboards'
import { AboutRepo, FilesRelatedMorph } from '@app/database/repo'

@Scene(USERS_SCENE.ABOUT)
export class UserAboutScene {
   fileUrl = null
   constructor(
      private aboutRepo: AboutRepo,
      private filesReletedMorphs: FilesRelatedMorph,
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @Hears(USERS_BUTTON.ABOUT.MAIN.TEXT)
   async showAboutText(@Ctx() ctx: SessionContext) {
      await this.getFilePath('about_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({
               source: this.fileUrl,
            })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
      const aboutData = await this.aboutRepo.getAboutText()
      if(aboutData) {
         try {
            await ctx.reply(aboutData.about_text, {
               disable_web_page_preview: true
            })
         } catch (error) {
            console.log(error)
         }
      }
   }
   @Hears(USERS_BUTTON.ABOUT.PRICE.TEXT)
   async showPriceImageText(@Ctx() ctx: SessionContext) {
      await this.getFilePath('about_read_price_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({
               source: this.fileUrl,
            })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   @Hears(USERS_BUTTON.ABOUT.OPROS.TEXT)
   async oprosPriceImageText(@Ctx() ctx: SessionContext) {
      await this.getFilePath('about_opros_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithDocument({
               source: this.fileUrl,
            })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   @Hears(USERS_BUTTON.ABOUT.POSTERS.TEXT)
   async postersPriceImageText(@Ctx() ctx: SessionContext) {
      const filesData = await this.filesReletedMorphs.findAllFilesUrlByFieldName('about_posters_image')
      if(filesData && filesData.length > 0) {
         for (let url of filesData) {
            try {
               await ctx.replyWithPhoto({
                  source: resolve('../dashboard/public' + url)
               })
            } catch (error) {
               console.log(error)
               console.log('Ошибка отправки фотографии')
               this.sendErrorMessage(ctx)
            }
         }
      } else {
         ctx.reply('Данные не загружены')
      }
   }
   @Hears(USERS_BUTTON.ABOUT.HALL_SCHEME.TEXT)
   async hallSchemeImageText(@Ctx() ctx: SessionContext) {
      await this.getFilePath('hall_scheme_image', ctx)
      if(this.fileUrl) {
         try {
            await ctx.replyWithPhoto({
               source: this.fileUrl,
            })
         } catch (error) {
            console.log(error)
            console.log('Ошибка отправки фотографии')
            this.sendErrorMessage(ctx)
         }
      }
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: SessionContext) {
      await ctx.reply('О НАС',
         this.navigationKeyboard.aboutButton()
      )
   }
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