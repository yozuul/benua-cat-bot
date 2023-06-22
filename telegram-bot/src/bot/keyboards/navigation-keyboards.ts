import { USERS_BUTTON } from '@app/common/constants';
import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf'

@Injectable()
export class NavigationKeyboard {
   startedUsers() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.STARTED.GRILL_MENU_ORDER.TEXT,
            USERS_BUTTON.STARTED.GRILL_MENU_ORDER.ACTION
         ),
         Markup.button.url(
            USERS_BUTTON.STARTED.FEEDBACK.TEXT,
            USERS_BUTTON.STARTED.FEEDBACK.TEXT,
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.KBZHU.TEXT,
            USERS_BUTTON.STARTED.KBZHU.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.MENU.TEXT,
            USERS_BUTTON.STARTED.MENU.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.PROMO.TEXT,
            USERS_BUTTON.STARTED.PROMO.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.ABOUT.TEXT,
            USERS_BUTTON.STARTED.ABOUT.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED.CART.TEXT,
            USERS_BUTTON.STARTED.CART.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   startedUsersOld() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.STARTED_OLD.MENU.TEXT,
            USERS_BUTTON.STARTED_OLD.MENU.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED_OLD.GRILL_MENU_ORDER.TEXT,
            USERS_BUTTON.STARTED_OLD.GRILL_MENU_ORDER.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED_OLD.ABOUT.TEXT,
            USERS_BUTTON.STARTED_OLD.ABOUT.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED_OLD.PROMO.TEXT,
            USERS_BUTTON.STARTED_OLD.PROMO.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.STARTED_OLD.CART.TEXT,
            USERS_BUTTON.STARTED_OLD.CART.ACTION
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
            USERS_BUTTON.MENU.DAYLY.TEXT,
            USERS_BUTTON.MENU.DAYLY.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.GRILL.TEXT,
            USERS_BUTTON.MENU.GRILL.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.GRILL_BREAKFAST.TEXT,
            USERS_BUTTON.MENU.GRILL_BREAKFAST.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU.DRINKS.TEXT,
            USERS_BUTTON.MENU.DRINKS.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   grillMenu() {
      const buttons = [
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.BREAKFAST.TEXT,
         //    USERS_BUTTON.MENU_GRILL.BREAKFAST.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.OMLET.TEXT,
         //    USERS_BUTTON.MENU_GRILL.OMLET.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.EGGS.TEXT,
         //    USERS_BUTTON.MENU_GRILL.EGGS.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.TOSTS.TEXT,
         //    USERS_BUTTON.MENU_GRILL.TOSTS.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.MEAT.TEXT,
         //    USERS_BUTTON.MENU_GRILL.MEAT.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.FISH.TEXT,
         //    USERS_BUTTON.MENU_GRILL.FISH.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.BURGER.TEXT,
         //    USERS_BUTTON.MENU_GRILL.BURGER.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.GARNISH.TEXT,
         //    USERS_BUTTON.MENU_GRILL.GARNISH.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.TOPPING.TEXT,
         //    USERS_BUTTON.MENU_GRILL.TOPPING.ACTION
         // ),
         // Markup.button.callback(
         //    USERS_BUTTON.MENU_GRILL.SAUSE.TEXT,
         //    USERS_BUTTON.MENU_GRILL.SAUSE.ACTION
         // ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.CART.TEXT,
            USERS_BUTTON.COMMON.CART.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   aboutButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.ABOUT.MAIN.TEXT,
            USERS_BUTTON.ABOUT.MAIN.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.ABOUT.PRICE.TEXT,
            USERS_BUTTON.ABOUT.PRICE.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.ABOUT.OPROS.TEXT,
            USERS_BUTTON.ABOUT.OPROS.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.ABOUT.POSTERS.TEXT,
            USERS_BUTTON.ABOUT.POSTERS.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   newsButton(signed) {
      const buttons = []
      if(signed) {
         buttons.push(
            Markup.button.callback(
               USERS_BUTTON.NEWS.NOT_SIGNED.TEXT,
               USERS_BUTTON.NEWS.NOT_SIGNED.ACTION
            )
         )
      } else {
         buttons.push(
            Markup.button.callback(
               USERS_BUTTON.NEWS.SIGNED.TEXT,
               USERS_BUTTON.NEWS.SIGNED.ACTION
            )
         )
      }
      buttons.push(
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         )
      )
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   cartButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.CART.ORDER.TEXT,
            USERS_BUTTON.CART.ORDER.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.CART.CLEAN.TEXT,
            USERS_BUTTON.CART.CLEAN.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   backCartButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.COMMON.CART.TEXT,
            USERS_BUTTON.COMMON.CART.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   backGrillOrderButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.STARTED.GRILL_MENU_ORDER.TEXT,
            USERS_BUTTON.STARTED.GRILL_MENU_ORDER.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   grillOrdersButton() {
      const buttons = [
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.BREAKFAST.TEXT,
            USERS_BUTTON.MENU_GRILL.BREAKFAST.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.MENU_GRILL.ALL_GRILL.TEXT,
            USERS_BUTTON.MENU_GRILL.ALL_GRILL.ACTION
         ),
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         ),
      ]
      return Markup.keyboard(buttons, {
         columns: 2
      }).resize()
   }
   backButton() {
      return Markup.keyboard([
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
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
               { text: USERS_BUTTON.COMMON.BACK.TEXT }
            ]
         ], columns: 2, resize_keyboard: true }
      }
   }
   backSubmitButton() {
      return Markup.keyboard([
         Markup.button.callback(
            USERS_BUTTON.COMMON.BACK.TEXT,
            USERS_BUTTON.COMMON.BACK.ACTION
         )], {
         columns: 1
      }).resize()
   }
}