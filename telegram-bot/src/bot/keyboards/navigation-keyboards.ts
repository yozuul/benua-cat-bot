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
            USERS_BUTTON.STARTED.PROMO.TEXT,
            USERS_BUTTON.STARTED.PROMO.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   mainMenu() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.MENU.WEEKLY.TEXT,
            USERS_BUTTON.MENU.WEEKLY.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.WEEKLY2.TEXT,
            USERS_BUTTON.MENU.WEEKLY2.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.DAILY.TEXT,
            USERS_BUTTON.MENU.DAILY.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.GRILL.TEXT,
            USERS_BUTTON.MENU.GRILL.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.COFFEE.TEXT,
            USERS_BUTTON.MENU.COFFEE.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT,
            USERS_BUTTON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   grillMenu() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.BREAKFAST.TEXT,
            USERS_BUTTON.MENU_GRILL.BREAKFAST.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.MAIN.TEXT,
            USERS_BUTTON.MENU_GRILL.MAIN.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.GARNISH.TEXT,
            USERS_BUTTON.MENU_GRILL.GARNISH.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.SAUSE.TEXT,
            USERS_BUTTON.MENU_GRILL.SAUSE.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT,
            USERS_BUTTON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   aboutButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.ABOUT.TEXT,
            USERS_BUTTON.ABOUT.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT,
            USERS_BUTTON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   backButton() {
      return Markup.keyboard([
         Markup.button.callback(
            USERS_BUTTON.BACK.TEXT,
            USERS_BUTTON.BACK.ACTION
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