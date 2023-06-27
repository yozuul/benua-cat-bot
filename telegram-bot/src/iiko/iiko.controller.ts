import { OnModuleInit } from '@nestjs/common'
import { GuestRepo, OrdersRepo } from '@app/database/repo'
import { Body, Controller, Post, Get } from '@nestjs/common'
import { Ctx, InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { IikoService } from './iiko.service'
import { SessionContext } from '@app/common/interfaces'
import { USERS_SCENE } from '@app/common/constants'

@Controller('iiko')
export class IikoController implements OnModuleInit {
   constructor(
      @InjectBot()
      private bot: Telegraf,
      private ordersRepo: OrdersRepo,
      private guestRepo: GuestRepo,
      private iikoService: IikoService,
   ) {}
   @Post('/getWebhookUpdate')
   async test(@Body() body: any, @Ctx() ctx: SessionContext) {
      const eventName = body[0]?.eventType
      const eventInfo = body[0]?.eventInfo
      if(eventName === 'DeliveryOrderUpdate') {
         const status = eventInfo.order.status
         const orderId = eventInfo.id
         // console.log('\nSTATUS:', status)
         // console.log('ORDER_ID:', orderId)
         const orderInfo = await this.iikoService.getOrderNumber(orderId)
         const orderNumber = orderInfo?.orders[0]?.order?.number
         if(orderNumber) {
            if(status === 'CookingStarted') {
               const order = await this.ordersRepo.findOrderByIiikoId(orderId)
               const guest = await this.ordersRepo.findTgIdByIiikoId(orderId)
               try {
                  await this.bot.telegram.sendMessage(guest.tg_id,
                     `Ваш номер заказа: ${order.iiko_order_num}\nВы получите уведомление по его готовности`
                  )
                  await ctx.scene.enter(USERS_SCENE.STARTED)
               } catch (error) {
                  console.log(error)
               }
            }
            await this.ordersRepo.updateOrderNumber(orderId, orderNumber)
         }
         if(status === 'CookingCompleted') {
            try {
               const order = await this.ordersRepo.findOrderByIiikoId(orderId)
               const guest = await this.ordersRepo.findTgIdByIiikoId(orderId)
               if(!order.done) {
                  await this.bot.telegram.sendMessage(guest.tg_id,
                     `✅ Заказ ${order.iiko_order_num} готов`
                  )
                  order.done = true
                  await order.save()
               } else {
                  return
               }
            } catch (error) {
               console.log(error)
            }
         }
      }
      console.log('eventName', eventName)
      console.log('eventInfo', eventInfo)
      if(eventName === 'StopListUpdate') {
         console.log('Обновление стоп листа')
         await this.iikoService.stopList()
      }
      // console.log('\n----- BODY BEGIN -----', body)
      // console.log('----- BODY END -----\n\n')
      // console.log('IikoController eventType', body[0].eventType)
      // console.log('IikoController eventInfo', body[0].eventInfo)
   }
   async onModuleInit() {
      // const orderId = '0d263e6c-f407-4baf-ac61-f270edb2c43a'
      // const order = await this.ordersRepo.findOrderByIiikoId(orderId)
      // const guest = await this.ordersRepo.findTgIdByIiikoId(orderId)
      // await this.bot.telegram.sendMessage(guest.tg_id,
      //    `✅ Заказ ${order.iiko_order_id} готов`
      // )
      // order.done = true
      // await order.save()
   }
}
