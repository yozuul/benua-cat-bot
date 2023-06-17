import { resolve } from 'path'
import { Scene, SceneEnter, Hears, On, Ctx, Start, Sender } from 'nestjs-telegraf'

import { USERS_SCENE, USERS_BUTTON } from '@app/common/constants'
import { SessionContext } from '@app/common/interfaces'
import { NavigationKeyboard } from '@bot/keyboards'

@Scene(USERS_SCENE.ABOUT)
export class UserAboutScene {
   constructor(
      private readonly navigationKeyboard: NavigationKeyboard
   ) {}
   @Start()
   async onStart(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
   @Hears(USERS_BUTTON.ABOUT.TEXT)
   async showSchemeHangler(@Ctx() ctx: SessionContext) {
      await ctx.replyWithPhoto({
         source: resolve('../dashboard/public/uploads/medium_scheme_997fe864c3.png')
      })
   }
   @SceneEnter()
   async onSceneEnter1(@Ctx() ctx: SessionContext) {
      await ctx.reply('🐱',
         this.navigationKeyboard.aboutButton()
      )
      let aboutText = 'Контактная информация:\n'
      aboutText += 'TG @kotikicanteen\n'
      aboutText += '+7 911 156 8589\n'
      aboutText += 'https://kotikicanteen.ru/\n'
      aboutText += 'Режим работы 9:00 - 21:00\n\n'
      aboutText += 'Что еще у нас есть:\n'
      aboutText += '- Сеть ресторанов "Общество чистых тарелок"\n'
      aboutText += '  https://cleanplatescafe.com | '
      aboutText += '<a href="https://instagram.com/tarelok?igshid=NTc4MTIwNjQ2YQ==">instagram</a>\n'
      aboutText += '- Бары "Mishka", "Луч" \n'
      aboutText += '  <a href="https://instagram.com/mishkacrew?igshid=NTc4MTIwNjQ2YQ==">instagram</a> | '
      aboutText += '  <a href="https://instagram.com/lu4spb?igshid=NTc4MTIwNjQ2YQ==">instagram 2</a>\n'
      aboutText += '- Кейтеринговая компания\n'
      aboutText += '  http://mishkacatering.com/\n'
      aboutText += '- Доставка готовых рационов питания\n'
      aboutText += '  https://tarelok.com/\n'
      await ctx.reply(aboutText, {
         disable_web_page_preview: true,
         parse_mode: 'HTML'
      })
   }
   @Hears(USERS_BUTTON.COMMON.BACK.TEXT)
   leaveSceneHandler(@Ctx() ctx: SessionContext) {
      ctx.scene.enter(USERS_SCENE.STARTED)
   }
}