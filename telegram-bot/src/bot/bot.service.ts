import { resolve } from 'path'
import { InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { GuestRepo, PanelFilesRepo } from '@app/database/repo'
import { NewsLetterRepo } from '@app/database/repo/news-letters.repo'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class BotService implements OnModuleInit {
   constructor(
      @InjectBot()
      private bot: Telegraf,
      private guestRepo: GuestRepo,
      private newsLettersRepo: NewsLetterRepo,
      private filesReletedMorphs: PanelFilesRepo,
   ) {}

   @Cron('0 * * * * *')
   async checkNewsletters() {
   }

   async sendNewsletters() {
      const guests = await this.guestRepo.findAllForNewsletter()
      if(guests.length > 0) {
         for (let guest of guests) {
            if(guest.name === 'Den') {
               await this.checkNewMessage(guest.tg_id)
            }
         }
      }
   }

   async checkNewMessage(tg_id, latest?) {
      let filePath = ''
      let textMessage = ''
      let isNewMessage = null
      if(latest) {
         isNewMessage = await this.newsLettersRepo.getLatest()
      }
      if(!latest) {
         isNewMessage = await this.newsLettersRepo.getUnsended()
      }
      if(isNewMessage.length === 0) return
      for (let message of isNewMessage) {
         textMessage += `<b>${message.header}</b>\n`
         textMessage += `${message.text}\n`
         const file = await this.filesReletedMorphs.findByNewlatedId(message.id)
         if(file) {
            filePath = resolve('../dashboard/public' + file.url)
         }
         if(filePath) {
            await this.sendPhoto(tg_id, textMessage, filePath, latest)
         } else {
            await this.sendMessage(tg_id, textMessage, latest)
         }
      }
   }

   async sendPhoto(tgId, message, photo, latest) {
      const messageData = {
         caption: message,
         parse_mode: 'HTML',
         reply_markup: this.disableNewslettersBtn
      } as any
      if(latest) {
         delete messageData.reply_markup
      }
      try {
         await this.bot.telegram.sendPhoto(tgId, { source: photo }, messageData)
      } catch (error) {
         console.log(error)
         console.log('Ошибка отправки фотографии')
      }
   }

   async sendMessage(tgId, message, latest) {
      const messageData = {
         caption: message,
         parse_mode: 'HTML',
         reply_markup: this.disableNewslettersBtn
      } as any
      if(latest) {
         delete messageData.reply_markup
      }
      try {
         await this.bot.telegram.sendMessage(tgId, message, messageData)
      } catch (error) {
         console.log(error)
         console.log('Ошибка отправки сообщения')
      }
   }

   messageData() {

   }

   get disableNewslettersBtn() {
      return  {
         inline_keyboard: [
            [
               { text: 'Отписаться от рассылки', callback_data: 'disable_newsletters' },
            ],
         ]
      }
   }

   onModuleInit() {
      this.sendNewsletters()
   }
}
