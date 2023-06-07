import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Dish, DishDishCategoryLink } from '../models'
import { DishCategoryRepo } from './dish-category.repo'

@Injectable()
export class DishRepo {
   constructor(
      @InjectModel(Dish)
      private dishRepo: typeof Dish,
      @InjectModel(DishDishCategoryLink)
      private dishCatLinkRepo: typeof DishDishCategoryLink,
      private dishCategoryRepo: DishCategoryRepo
   ) {}

   async checkDish(dish) {
      try {
         const existCategory = await this.dishCategoryRepo.findOrCreate(dish)
         const categoryId = existCategory[0].id
         const isDishExist = await this.dishRepo.findOne({
            where: {
               name: dish.name
            }
         })
         if(!isDishExist) {
            const newDish = await this.dishRepo.create(dish)
            await this.dishCatLinkRepo.create({
               dish_id: newDish.id,
               dishes_category_id: categoryId
            })
            console.log('newDish', newDish)
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

   cleanDeleted(name) {

   }
}
