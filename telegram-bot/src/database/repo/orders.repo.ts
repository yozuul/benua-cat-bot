import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { DishOrderIdLink, Order, OrderGuestIdLink } from '../models'
import { GuestRepo } from './guest.repo'

@Injectable()
export class OrdersRepo {
   constructor(
      @InjectModel(Order)
      private orderRepo: typeof Order,
      @InjectModel(OrderGuestIdLink)
      private orderGuestLinkRepo: typeof OrderGuestIdLink,
      @InjectModel(DishOrderIdLink)
      private dishOrderLinkRepo: typeof DishOrderIdLink,
      private guestRepo: GuestRepo,
   ) {}

   async createOrder(iikoOrderId, guestId, dishes) {
      const order = await this.orderRepo.create({
         iiko_order_id: iikoOrderId
      })
      try {
         await this.orderGuestLinkRepo.create({
            order_id: order.id,
            guest_id: guestId
         })
      } catch (error) {
         console.log(error)
         console.log('не смогли слинковать пользователя с заказов')
      }
      dishes.map(async (dishId, index) => {
         try {
            await this.dishOrderLinkRepo.create({
               dish_id: dishId,
               order_id: order.id,
               dish_order: index
            })
         } catch (error) {
            console.log(error)
            console.log('Не смогли слинковать заказ с блюдом')
         }
      })
   }

   async findOrderByIiikoId(iikoId) {
      return this.orderRepo.findOne({
         where: { iiko_order_id: iikoId }
      })
   }
   async findGuestByOrder(orderId) {
      return this.orderGuestLinkRepo.findOne({
         where: { order_id: orderId }
      })
   }
   async findTgIdByIiikoId(iikoOrderId) {
      const order = await this.findOrderByIiikoId(iikoOrderId)
      const guestLink = await this.findGuestByOrder(order.id)
      const guest = await this.guestRepo.findById(guestLink.guest_id)
      console.log(guest)
      return guest
   }
}
