import { resolve } from 'node:path'
export const generateGrillMenu = async (dishes, carts, ctx) => {
   for (let dish of dishes) {
      let imgCaption = baseCaption(dish)
      const cartExist = await carts.find((cartDish) => {
         return cartDish.dish_id === dish.dish_id
      })
      let dishMenuBlock = null
      if(cartExist) {
         const totalPrice = dish.price * cartExist.quantity
         imgCaption += `Цена: ${dish.price} x ${cartExist.quantity} = ${totalPrice} ₽`
         dishMenuBlock = keyboard(dish.dish_id, cartExist.quantity)
      }
      if(!cartExist) {
         imgCaption += `Цена: ${dish.price} ₽\n`
         dishMenuBlock = keyboard(dish.dish_id, 0)
      }
      if(dish.photo) {
         await ctx.replyWithPhoto(dish.photo, {
            caption: imgCaption,
            reply_markup: dishMenuBlock
         })
      } else {
         await ctx.replyWithPhoto({
            source: resolve('../dashboard/public/uploads/default_dish.png')
         }, {
            caption: imgCaption,
            reply_markup: dishMenuBlock
         })
      }
   }
}
export const editGrillMenu = async (chatId, messageId, dish, carts, ctx) => {
   let imgCaption = baseCaption(dish)
   const cartExist = await carts.find((cartDish) => {
      return cartDish.dish_id === dish.id
   })
   let dishMenuBlock = null
   if(cartExist) {
      const totalPrice = dish.price * cartExist.quantity
      imgCaption += `Цена: ${dish.price} x ${cartExist.quantity} = ${totalPrice} ₽`
      dishMenuBlock = keyboard(dish.id, cartExist.quantity)
   }
   if(!cartExist) {
      imgCaption += `Цена: ${dish.price} ₽\n`
      dishMenuBlock = keyboard(dish.id, 0)
   }
   try {
      await ctx.telegram.editMessageCaption(
         chatId, messageId, null, imgCaption, {
            reply_markup: dishMenuBlock
         }
      )
   } catch (error) {
      console.log('111')
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
function keyboard(dishId, num) {
   return {
      inline_keyboard: [
         [
            { text: '-', callback_data: `minus_${dishId}` },
            { text: `${num} шт.`, callback_data: 'num' },
            { text: '+', callback_data: `plus_${dishId}` },
         ],
         [
            { text: '🛒 В корзину', callback_data: 'to_cart_action' }
         ]
      ]
   }
}