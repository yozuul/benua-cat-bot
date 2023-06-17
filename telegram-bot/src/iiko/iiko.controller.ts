import { GuestRepo, OrdersRepo } from '@app/database/repo'
import { Body, Controller, Post, Get } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

@Controller('iiko')
export class IikoController {
   constructor(
      @InjectBot()
      private bot: Telegraf,
      private ordersRepo: OrdersRepo,
      private guestRepo: GuestRepo,
   ) {}
   @Post('/test')
   async test(@Body() body: any) {
      const eventName = body[0].eventType
      if(eventName === 'DeliveryOrderUpdate') {
         // const userId = await this.ordersRepo.findOrderByIiikoId()
         // console.log('ЗАКАЗ')
      }
      console.log('\n----- BODY BEGIN -----', body)
      console.log('----- BODY END -----\n\n')
      console.log('IikoController eventType', body[0].eventType)
      console.log('IikoController eventInfo', body[0].eventInfo)
   }
}

// IikoController eventInfo {
//    id: '4761c5f4-a578-4f8c-9d80-8429f2d163d2',
//    posId: '01b7f663-4668-4772-adec-6bd0ab4e8d63',
//    externalNumber: null,
//    organizationId: 'b8a4ae13-fdc2-4a2a-9d8c-d53122a28b08',
//    timestamp: 1686839654131,
//    creationStatus: 'Success',
//    errorInfo: null,
//    order: {
//      parentDeliveryId: null,
//      customer: {
//        type: 'regular',
//        id: 'f4e34a82-3936-4564-b0e2-1fa3d82ea96e',
//        name: 'TESTORDER',
//        surname: 'CLEAR.bat',
//        comment: null,
//        gender: 'NotSpecified',
//        inBlacklist: false,
//        blacklistReason: null,
//        birthdate: null
//      },
//      phone: '+70001112233',
//      deliveryPoint: null,
//      status: 'CookingCompleted',
//      cancelInfo: null,
//      courierInfo: null,
//      completeBefore: '2023-06-15 17:25:34.319',
//      whenCreated: '2023-06-15 17:10:34.747',
//      whenConfirmed: '2023-06-15 17:10:34.747',
//      whenPrinted: null,
//      whenCookingCompleted: null,
//      whenSended: null,
//      whenDelivered: null,
//      comment: 'ЗАКАЗ С БОТА',
//      problem: null,
//      operator: null,
//      marketingSource: null,
//      deliveryDuration: 15,
//      indexInCourierRoute: null,
//      cookingStartTime: '2023-06-15 17:10:34.747',
//      isDeleted: false,
//      whenReceivedByApi: '2023-06-15 14:10:35.906',
//      whenReceivedFromFront: '2023-06-15 14:10:37.590',
//      movedFromDeliveryId: null,
//      movedFromTerminalGroupId: null,
//      movedFromOrganizationId: null,
//      externalCourierService: null,
//      movedToDeliveryId: null,
//      movedToTerminalGroupId: null,
//      movedToOrganizationId: null,
//      menuId: null,
//      sum: 140,
//      number: 8,
//      sourceKey: null,
//      whenBillPrinted: null,
//      whenClosed: null,
//      conception: null,
//      guestsInfo: { count: 1, splitBetweenPersons: false },
//      items: [ [Object], [Object] ],
//      combos: [],
//      payments: [ [Object] ],
//      tips: [],
//      discounts: [],
//      orderType: {
//        id: '5b1508f9-fe5b-d6af-cb8d-043af587d5c2',
//        name: 'Доставка самовывоз',
//        orderServiceType: 'DeliveryByClient'
//      },
//      terminalGroupId: '6ca8d477-17ce-4281-a17e-81b6926a0ad7',
//      processedPaymentsSum: 0,
//      loyaltyInfo: null,
//      externalData: null
//    }
//  }
//  body [
//    {
//      eventType: 'DeliveryOrderUpdate',
//      eventTime: '2023-06-15 14:34:16.150',
//      organizationId: 'b8a4ae13-fdc2-4a2a-9d8c-d53122a28b08',
//      correlationId: 'bded2593-592c-4e17-8ede-1280c9022083',
//      eventInfo: {
//        id: '15f0d0b0-3f09-48bd-8299-cef3d6db7217',
//        posId: 'cf0662b8-feae-4f38-8be8-d3eb87eedf33',
//        externalNumber: null,
//        organizationId: 'b8a4ae13-fdc2-4a2a-9d8c-d53122a28b08',
//        timestamp: 1686839656132,
//        creationStatus: 'Success',
//        errorInfo: null,
//        order: [Object]
//      }
//    }
//  ]
// data {
//    correlationId: 'e5e14ed8-69d4-4401-9f1f-0bbdb867dbbb',
//    errorDescription: "Error converting value {null} to type 'System.Guid'. Path 'productId', line 55, position 25.",
//    error: 'INVALID_BODY_JSON_FORMAT'
//  }