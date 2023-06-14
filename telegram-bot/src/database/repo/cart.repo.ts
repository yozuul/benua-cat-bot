import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Cart, Guest } from '../models'
import { GuestRepo } from './guest.repo'

@Injectable()
export class CartRepo {
   constructor(
      @InjectModel(Cart)
      private cartRepo: typeof Cart,
      private guestRepo: GuestRepo
   ) {}

   async findCartByTgId(tg_id) {
      let cart = []
      const guest = await this.guestRepo.find(tg_id)
      if(guest) {
         cart = await this.cartRepo.findAll({
            where: {
               guest_id: guest.id
            }
         })
      }
      return cart
   }
   async findCart(guest_id) {
      return this.cartRepo.findAll({
         where: {
            guest_id: guest_id
         }
      })
   }
   async pushItem(guest_id, dish_id, quantity) {
      return this.cartRepo.create({
         guest_id: guest_id,
         dish_id: dish_id,
         quantity: quantity,
      })
   }
   async deleteItem(cartItemId) {
      return this.cartRepo.destroy({
         where: {
            id: cartItemId
         }
      })
   }
   async updateItem(cartItemId, quantity) {
      const cartItem = await this.cartRepo.findOne({
         where: { id: cartItemId }
      })
      cartItem.quantity = quantity
      await cartItem.save()
      return cartItem
   }
}
