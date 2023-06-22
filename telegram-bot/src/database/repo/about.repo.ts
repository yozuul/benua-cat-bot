import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { About, Guest } from '../models'

@Injectable()
export class AboutRepo {
   constructor(
      @InjectModel(About)
      private aboutRepo: typeof About,
   ) {}
   async getAboutText() {
      return this.aboutRepo.findOne()
   }
}
