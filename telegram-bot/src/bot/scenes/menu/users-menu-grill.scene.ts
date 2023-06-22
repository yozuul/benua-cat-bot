import { resolve } from 'node:path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard, generateGrillMenu } from '@bot/keyboards'
import { CartRepo, DishRepo, FilesRelatedMorph } from '@app/database/repo'
import { FilesUploaded } from '@app/database/models'

@Scene(USERS_SCENE.MENU_GRILL)
export class UserMenuGrillScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard,
      private dishRepo: DishRepo,
      private cartRepo: CartRepo,
      private filesReletedMorphs: FilesRelatedMorph,
   ) {}
   // --------------
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      let fileUrl = null
      await ctx.reply('ГРИЛЬ МЕНЮ',
         this.navigationKeyboard.mainMenu()
      )
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
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   async leaveSceneHandler(@Ctx() ctx: SessionContext) {
      await ctx.scene.enter(USERS_SCENE.MENU)
   }
}