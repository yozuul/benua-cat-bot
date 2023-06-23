import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { Injectable, OnModuleInit } from '@nestjs/common'

import { OrdersRepo, StopListRepo } from '@app/database/repo'

@Injectable()
export class IikoService implements OnModuleInit {
   constructor(
      private stopListRepo: StopListRepo,
      private ordersRepo: OrdersRepo,
   ) {}
   private iikoAccessToke


   async testIiikoOrderUpdate() {
   }

   async onModuleInit() {
      // this.setWebhookSettings()
      // this.testIiikoOrderUpdate()
      // await this.stopList()
      // this.downloadFile()
      // await this.auth()
      // this.createOrder()
      // this.paymentsTypes()
      // this.getTerminals()
      // this.panelFilesRepo.getFiles()
      // this.getCustomersCategories()
      // this.getWebhookSettings()
      // this.getMenu()
   }

   async getOrderNumber(iikoUUID) {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/deliveries/by_id'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationId: process.env.IIKO_ORGANIZATION_ID,
               orderIds: [iikoUUID],
            })
         });
         const data = await response.json()
         console.log(data)
         // await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async createOrder(cartItems, summ, guest) {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/deliveries/create'
      const order = {
        organizationId: process.env.IIKO_ORGANIZATION_ID,
        terminalGroupId: process.env.IIKO_GRILL_TERMINAL_ID,
        createOrderSettings: { mode: 'Async' },
        order: {
          items: cartItems,
          payments: [
            {
              paymentTypeKind: 'Cash',
              sum: summ.toString(),
              paymentTypeId: '09322f46-578a-d210-add7-eec222a08871',
            },
          ],
          phone: '+70001112233',
          orderTypeId: '5b1508f9-fe5b-d6af-cb8d-043af587d5c2',
          comment: "ЗАКАЗ С БОТА",
          guests: {
            count: 1,
            splitBetweenPersons: "false",
          },
          customer: {
            name: guest.name,
          }
        }
      }
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify(order)
         });
         const data = await response.json()
         const orderId = data.orderInfo.id
         // const orderNum = await this.getOrderNumber(orderId)
         // console.log(data.paymentTypes[1])
         // await this.toFile(data)
         return orderId
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async paymentsTypes() {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/payment_types'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationIds: [process.env.IIKO_ORGANIZATION_ID]
            })
         });
         const data = await response.json()
         console.log(data.paymentTypes[1])
         // await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async setWebhookSettings() {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/webhooks/update_settings'
      const webHooksUri = 'http://89.19.216.226:3000/iiko/getWebhookUpdate'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationId: process.env.IIKO_ORGANIZATION_ID,
               webHooksUri: webHooksUri,
               authToken: process.env.IIKO_TOKEN,
               webHooksFilter: {
                 deliveryOrderFilter: {
                   orderStatuses: [
                     'Unconfirmed', 'WaitCooking', 'ReadyForCooking', 'CookingStarted', 'CookingCompleted', 'Waiting', 'OnWay', 'Delivered', 'Closed', 'Cancelled'
                   ],
                   itemStatuses: [
                     'Added', 'PrintedNotCooking', 'CookingStarted', 'CookingCompleted', 'Served'
                   ],
                   errors: true
                 },
                 tableOrderFilter: {
                   orderStatuses: [
                     'New'
                   ],
                   itemStatuses: [
                     'Added'
                   ],
                   errors: true
                 },
                 reserveFilter: {
                   updates: true, "errors": true
                 },
                 stopListUpdateFilter: {
                   updates: true
                 },
                 personalShiftFilter: {
                   updates: true
                 }
               }
             })
         });
         const data = await response.json()
         console.log(data)
         // await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async getWebhookSettings() {
      const url = 'https://api-ru.iiko.services/api/1/webhooks/settings'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationId: process.env.IIKO_ORGANIZATION_ID
            })
         });
         const data = await response.json()
         console.log(data)
         // await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async stopList() {
      await this.auth()
      const grillTerminal = '6ca8d477-17ce-4281-a17e-81b6926a0ad7'
      const url = 'https://api-ru.iiko.services/api/1/stop_lists'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationIds: [process.env.IIKO_ORGANIZATION_ID]
            })
         });
         const data = await response.json()
         const stopList = data.terminalGroupStopLists[0].items
         const getGrillItems = stopList.find((terminal) => {
            return terminal.terminalGroupId === grillTerminal
         })
         await this.stopListRepo.updateStopList(getGrillItems)
         return getGrillItems
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async getMenu() {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/nomenclature'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationId: process.env.IIKO_ORGANIZATION_ID
            })
         });
         const data = await response.json()
         await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async getTerminals() {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/terminal_groups'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationIds: [process.env.IIKO_ORGANIZATION_ID]
            })
         });
         const data = await response.json()
         console.log(data.terminalGroups[0])
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async auth() {
      const authUrl = 'https://api-ru.iiko.services/api/1/access_token'
      try {
         const response = await fetch(authUrl, {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               apiLogin: process.env.IIKO_TOKEN
            })
         });
         const data = await response.json()
         this.iikoAccessToke = data.token
         console.log(this.iikoAccessToke)
         return data
       } catch (error) {
         console.error('ERROR auth', error)
       }
   }

   get authHeader() {
      return {
         'Content-Type': 'application/json; charset=utf-8',
         Authorization: `Bearer ${this.iikoAccessToke}`
      }
   }

   async toFile(arr) {
      try {
         const data = new Uint8Array(Buffer.from(JSON.stringify(arr)));
         const promise = writeFile('menu.json', data);
         await promise;
       } catch (err) {
         console.error(err);
       }
   }

   async getOrganization() {
      const url = 'https://api-ru.iiko.services/api/1/organizations'
      try {
         const response = await fetch(url, {
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               Authorization: `Bearer ${this.iikoAccessToke}`
            },
            method: 'POST',
            body: JSON.stringify({
               Authorization: `Bearer ${this.iikoAccessToke}`
            })
         });
         const data = await response.json()
         console.log(data)
         return data
       } catch (error) {
         console.error('ERROR getOrganization', error)
       }
   }

   async getCustomersCategories() {
      const url = 'https://api-ru.iiko.services/api/1/loyalty/iiko/customer_category'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               organizationId: process.env.IIKO_ORGANIZATION_ID
            })
         });
         const data = await response.json()
         console.log(data)
         // await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

}
