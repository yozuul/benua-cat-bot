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
