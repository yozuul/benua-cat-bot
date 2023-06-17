import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Guest } from '../models'

@Injectable()
export class GuestRepo {
   constructor(
      @InjectModel(Guest)
      private guestRepo: typeof Guest,
   ) {}

   async toggleNewletterSigned(tg_id, action) {
      const user = await this.guestRepo.findOne({
         where: {
            tg_id: tg_id.toString()
         }
      })
      user.signed_newsletter = action
      await user.save()
   }

   async findAllForNewsletter() {
      return this.guestRepo.findAll({
         where: { signed_newsletter: true }
      })
   }
   async findById(guestId) {
      return await this.guestRepo.findOne({
         where: { id: guestId }
      })
   }
   async findByTgId(tg_id) {
      return await this.guestRepo.findOne({
         where: {
            tg_id: tg_id.toString()
         }
      })
   }
   async find(tg_id) {
      return await this.guestRepo.findOne({
         where: {
            tg_id: tg_id.toString()
         }
      })
   }
   async findCreate(tg_id, name) {
      let guest = await this.guestRepo.findOne({
         where: {
            tg_id: tg_id.toString()
         }
      })
      if(!guest) {
         guest = await this.guestRepo.create({
            tg_id: tg_id,
            name: name
         })
      }
      return guest
   }
}
