import {USERS_SCENE} from '@app/common/constants'
import { resolve } from 'node:path'

export const generateGrillMenu = async (dishes, carts, ctx) => {
   const scene = ctx.session.__scenes.current
   if(!ctx.session.trash) {
      ctx.session.trash = []
   }
   for (let dish of dishes) {
      let imgCaption = baseCaption(dish)
      const cartExist = await carts.find((cartDish) => {
         return cartDish.dish_id === dish.dish_id
      })
      let dishMenuBlock = null
      if(cartExist) {
         const totalPrice = dish.price * cartExist.quantity
         imgCaption += `Цена: ${dish.price} x ${cartExist.quantity} = ${totalPrice} ₽`
         dishMenuBlock = keyboard(dish.dish_id, cartExist.quantity, scene)
      }
      if(!cartExist) {
         imgCaption += `Цена: ${dish.price} ₽\n`
         dishMenuBlock = keyboard(dish.dish_id, 0, scene)
      }
      if(dish.photo) {
         const { message_id } = await ctx.replyWithPhoto(dish.photo, {
            caption: imgCaption,
            reply_markup: dishMenuBlock
         })
         if(scene === USERS_SCENE.CART) {
            ctx.session.cart.push(message_id)
         } else {
            ctx.session.trash.push(message_id)
         }
      } else {
         const { message_id } = await ctx.replyWithPhoto({
            source: resolve('../dashboard/public/uploads/default_dish.png')
         }, {
            caption: imgCaption,
            reply_markup: dishMenuBlock
         })
         if(scene === USERS_SCENE.CART) {
            ctx.session.cart.push(message_id)
         } else {
            ctx.session.trash.push(message_id)
         }
      }
   }
}
export const editGrillMenu = async (chatId, messageId, dish, carts, ctx) => {
   const scene = ctx.session.__scenes.current
   let imgCaption = baseCaption(dish)
   const cartExist = await carts.find((cartDish) => {
      return cartDish.dish_id === dish.id
   })
   let dishMenuBlock = null
   if(cartExist) {
      const totalPrice = dish.price * cartExist.quantity
      imgCaption += `Цена: ${dish.price} x ${cartExist.quantity} = ${totalPrice} ₽`
      dishMenuBlock = keyboard(dish.id, cartExist.quantity, scene)
   }
   if(!cartExist) {
      imgCaption += `Цена: ${dish.price} ₽\n`
      dishMenuBlock = keyboard(dish.id, 0, scene)
   }
   try {
      await ctx.telegram.editMessageCaption(
         chatId, messageId, null, imgCaption, {
            reply_markup: dishMenuBlock
         }
      )
   } catch (error) {
      console.log('111')
      return
   }
}
function baseCaption(dish) {
   let imgCaption = ''
   imgCaption += `${dish.name}\n`
   imgCaption += `Состав: ${dish.ingredients}\n`
   imgCaption += `${dish.kbzhu}\n`
   imgCaption += `Вес: ${dish.weight} гр.\n---\n`
   return imgCaption
}
function keyboard(dishId, num, scene) {
   const menuData = {
      inline_keyboard: [
         [
            { text: '-', callback_data: `minus_${dishId}` },
            { text: `${num} шт.`, callback_data: 'num' },
            { text: '+', callback_data: `plus_${dishId}` },
         ],
      ]
   }
   if(scene === 'USER_MENU_GRILL_ORDER_SCENE') {
      menuData.inline_keyboard.push([
         { text: '⬅️ К выбору категорий', callback_data: 'to_grill_order_action' },
         { text: '🛒 Оформить заказ', callback_data: 'to_cart_action' },
      ])
   }
   // else {
   //    menuData.inline_keyboard.push([
   //       { text: '⬅️ К выбору категорий', callback_data: 'to_grill_order_action' },
   //    ])
   // }
   return menuData
}