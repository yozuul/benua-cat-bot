import { Context as ContextTelegraf } from 'telegraf';

export interface SessionContext extends ContextTelegraf {
   session: {
      path: 'home'
      scene: string
      cart: any,
      trash: any
   }
   scene: {
      enter: any
   }
}