import { USERS_BUTTON } from '@app/common/constants';
import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf'

@Injectable()
export class NavigationKeyboard {
   startedUsers() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.STARTED.MENU.TEXT,
            USERS_BUTTON.STARTED.MENU.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.KBZHU.TEXT,
            USERS_BUTTON.STARTED.KBZHU.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.ABOUT.TEXT,
            USERS_BUTTON.STARTED.ABOUT.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.ACTION.TEXT,
            USERS_BUTTON.STARTED.ACTION.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   backButton() {
      return Markup.keyboard([
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT, USERS_BUTTON.BACK.ACTION
         )], {
         columns: 1
      }).resize()
   }
   backAuthButton() {
      return {
         reply_markup: {
         keyboard: [
            [
               { text: 'ПОДТВЕРДИТЬ 📞',
                  request_contact: true },
               { text: USERS_BUTTON.BACK.TEXT }
            ]
         ], columns: 2, resize_keyboard: true }
      }
   }
   backSubmitButton() {
      return Markup.keyboard([
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT, USERS_BUTTON.BACK.ACTION
         )], {
         columns: 1
      }).resize()
   }
}