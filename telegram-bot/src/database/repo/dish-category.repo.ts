import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { DishCategory } from '../models'


@Injectable()
export class DishCategoryRepo {
   constructor(
      @InjectModel(DishCategory)
      private dishCategoryRepo: typeof DishCategory
   ) {}

   async create(parentName, subName) {
      return this.dishCategoryRepo.create({
         parent_name: parentName,
         sub_name: subName,
      })
   }
   async findOrCreate(dish) {
      return this.dishCategoryRepo.findOrCreate({
         where: {
            [Op.and]: [
               { parent_name: dish.parent_name },
               { sub_name: dish.sub_name },
            ]
         },
         defaults: {
            parent_name: dish.parent_name,
            sub_name: dish.sub_name,
         }
      })
   }
}
