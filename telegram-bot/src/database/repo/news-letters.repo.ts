import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { NewsLetter } from '../models'

@Injectable()
export class NewsLetterRepo {
   constructor(
      @InjectModel(NewsLetter)
      private newsLetterRepo: typeof NewsLetter,
   ) {}

   async getLatest() {
      return this.newsLetterRepo.findAll({
         order: [[ 'created_at', 'DESC' ]],
         limit: 2
      })
   }
   async getUnsended() {
      return this.newsLetterRepo.findAll({
         where: { sended: false }
      })
   }
   async switchUnsendedStatus(id) {
      const message = await this.newsLetterRepo.findOne({
         where: { id: id }
      })
      message.sended = true
      await message.save()
   }
}
