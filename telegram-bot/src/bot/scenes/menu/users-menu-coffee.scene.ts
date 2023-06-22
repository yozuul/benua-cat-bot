import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf';

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants';
import { SessionContext } from '@app/common/interfaces';
import { NavigationKeyboard } from '@bot/keyboards';
import { FilesRelatedMorph } from '@app/database/repo';

@Scene(USERS_SCENE.MENU_COFFEE)
export class UserMenuCoffeeScene {
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
      let fileUrl = null
      await ctx.reply('КОФЕ И ГОРЯИЧЕ НАПИТКИ',
         this.navigationKeyboard.mainMenu()
      )
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
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.MENU)
   }
}