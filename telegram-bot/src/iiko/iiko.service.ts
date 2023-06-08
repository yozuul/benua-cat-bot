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
      // this.panelFilesRepo.getFiles()
      // await this.auth()
      // this.getCustomersCategories()
      // this.getWebhookSettings()
      // this.getMenu()
   }

   async test() {
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

   async setWebhookSettings() {
      const url = 'https://api-ru.iiko.services/api/1/webhooks/update_settings'
      const webHooksUri = 'https://1ed6-212-32-207-0.ngrok-free.app/iiko/test'
      try {
         const response = await fetch(url, {
            headers: this.authHeader,
            method: 'POST',
            body: JSON.stringify({
               "organizationId": process.env.IIKO_ORGANIZATION_ID,
               "webHooksUri": webHooksUri,
               "authToken": process.env.IIKO_TOKEN,
               "webHooksFilter": {
                 "deliveryOrderFilter": {
                   "orderStatuses": [
                     "Unconfirmed"
                   ],
                   "itemStatuses": [
                     "Added"
                   ],
                   "errors": true
                 },
                 "tableOrderFilter": {
                   "orderStatuses": [
                     "New"
                   ],
                   "itemStatuses": [
                     "Added"
                   ],
                   "errors": true
                 },
                 "reserveFilter": {
                   "updates": true,
                   "errors": true
                 },
                 "stopListUpdateFilter": {
                   "updates": true
                 },
                 "personalShiftFilter": {
                   "updates": true
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
         console.log(data)
         await this.toFile(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
       }
   }

   async getTerminals() {
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
         console.log(data)
         return data
       } catch (error) {
         console.error('ERROR getTerminals', error)
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
}
