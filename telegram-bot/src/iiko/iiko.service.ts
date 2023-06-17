import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { Injectable, OnModuleInit } from '@nestjs/common'

import { PanelFilesRepo } from '@app/database/repo'

@Injectable()
export class IikoService implements OnModuleInit {
   constructor(
      private panelFilesRepo: PanelFilesRepo
   ) {}
   private iikoAccessToke

   async onModuleInit() {
      // this.downloadFile()
      // await this.auth()
      // this.createOrder()
      // this.paymentsTypes()
      // this.getTerminals()
      // this.setWebhookSettings()
      // this.panelFilesRepo.getFiles()
      // this.getCustomersCategories()
      // this.getWebhookSettings()
      // this.getMenu()
   }

   async getFile() {

   }

   async createOrder(cartItems, summ) {
      await this.auth()
      const url = 'https://api-ru.iiko.services/api/1/deliveries/create'

      const order = {
        organizationId: process.env.IIKO_ORGANIZATION_ID,
        terminalGroupId: process.env.IIKO_GRILL_TERMINAL_ID,
        createOrderSettings: {
          mode: 'Async',
        },
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
            name: "TESTORDER",
            surname: "CLEAR.bat",
          },
        },
      };

      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify(order)
         });
         const data = await response.json()
         console.log('data', data)
         const orderId = data.orderInfo.id
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
      const webHooksUri = 'https://2e65-212-32-192-113.ngrok-free.app/iiko/test'
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
      console.log(process.env.IIKO_ORGANIZATION_ID)
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
         console.log(data.terminalGroupStopLists[0].items[0])
         // await this.toFile(data)
         return data
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

//    async downloadFile() {
//       const fileName = 'document.pdf';  // replace with your filename
//       const downloadPath = `https://cloud-api.yandex.net/v1/disk/resources/download?path=01.jpg`;
//
//       try {
//          const response = await fetch(downloadPath, {
//             headers: { 'Authorization': `OAuth ${process.env.YANDEX_DISK_AUTH_TOKEN}` }
//          });
//          const jsonResponse = await response.json();
//          if (jsonResponse.href) {
//             const fileResponse = await fetch(jsonResponse.href);
//             // then you can do whatever you want with the file, e.g. save it somewhere
//          } else {
//             console.log("Error downloading file:", jsonResponse.error, jsonResponse.message);
//          }
//       } catch (error) {
//          console.log('Ошибка авторизации', error);
//       }
//    }
}
