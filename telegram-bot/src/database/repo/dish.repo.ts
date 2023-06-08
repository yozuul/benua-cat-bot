import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Dish, DishCategoryLink } from '../models'
import { DishCategoryRepo } from './dish-category.repo'

@Injectable()
export class DishRepo {
   constructor(
      @InjectModel(Dish)
      private dishRepo: typeof Dish,
      @InjectModel(DishCategoryLink)
      private dishCatLinkRepo: typeof DishCategoryLink,
      private dishCategoryRepo: DishCategoryRepo
   ) {}

   async switchChecked() {
      await this.dishRepo.update({ checked: false }, {
         where: { checked: true  }
      })
   }
   async cleanUnchecked() {
      await this.dishRepo.destroy({
         where: { checked: false  }
      })
   }

   async checkDish(dish) {
      try {
         const existCategory = await this.dishCategoryRepo.findOrCreate(dish)
         const categoryId = existCategory[0].id
         const dishExist = await this.dishRepo.findOne({
            where: {
               [Op.and]: [
                  { name: dish.name },
                  { ingredients: dish.ingredients }
               ]
            }
         })
         if(dishExist) {
            dishExist.checked = true
            await dishExist.save()
         }
         if(!dishExist) {
            console.log('Добавляем блюдо', dish)
            const newDish = await this.dishRepo.create(dish)
            await this.dishCatLinkRepo.create({
               dish_id: newDish.id,
               category_id: categoryId
            })
         }
      } catch (error) {
         console.log(error)
      }
   }

   async findByName(dishName) {
      return this.dishRepo.findOne({
         where: { name: dishName }
      })
   }
}
