import { Injectable } from '@nestjs/common'
import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

// import { SceneContext, SessionContext } from '@app/common/interfaces'
// import { NavigationKeyboard } from '@bot/keyboards'
// import { USERS_SCENE } from '@app/common/constants'

@Injectable()
@Update()
export class BotUpdate {
   constructor(
      // @InjectBot()
      // private readonly bot: Telegraf<SessionContext>,
      // private readonly navigationKeyboard: NavigationKeyboard
   ) {}

//    @Start()
//    async startCommand(ctx: SceneContext) {
//       ctx.scene.enter(USERS_SCENE.STARTED)
//    }
//
//    @On('callback_query')
//    async handleNonSceneCallback(@Ctx() ctx: SessionContext) {
//       await ctx.answerCbQuery('Меню устарело')
//       await ctx.deleteMessage()
//       await ctx.scene.enter(USERS_SCENE.STARTED)
//    }
//    @On('contact')
//    async handlerContacts(@Ctx() ctx: SessionContext) {
//       await ctx.answerCbQuery('Меню устарело')
//       await ctx.deleteMessage()
//       await ctx.scene.enter(USERS_SCENE.STARTED)
//    }
//
//    @On('new_chat_members')
//    async msgChantMemeber(@Ctx() ctx: SessionContext) {
//       // console.log(ctx)
//    }
//    @On('my_chat_member')
//    async myChantMemeber(@Ctx() ctx: SessionContext) {
//       // console.log(ctx.update)
//    }
//    @On('message')
//    async msgeHandler(ctx: SessionContext) {
//       console.log('No Scene Msg')
//       await ctx.scene.enter(USERS_SCENE.STARTED)
//       // ctx.session.path = 'home'
//       // const bot = await this.bot.telegram.getMe();
//       // console.log('Msg at home path >', ctx.message['text'])
//       // console.log('From >', ctx.message.from)
//    }
}