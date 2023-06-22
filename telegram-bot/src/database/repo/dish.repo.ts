import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Dish, DishCategory, DishCategoryLink } from '../models'
import { DishCategoryRepo } from './dish-category.repo'
import { StopListRepo } from './stop-list.repo'

@Injectable()
export class DishRepo {
   constructor(
      @InjectModel(Dish)
      private dishRepo: typeof Dish,
      @InjectModel(DishCategoryLink)
      private dishCatLinkRepo: typeof DishCategoryLink,
      private dishCategoryRepo: DishCategoryRepo,
      private stopListRepo: StopListRepo,
   ) {}

   async getByCategory(catName) {
      const dishes = []
      const categories = await this.dishCategoryRepo.findByName(catName)
      for (let { id } of categories) {
         const foundedDishes = await this.dishCatLinkRepo.findAll({
            where: {
               category_id: id
            }, include: [Dish],
            raw: true
         })
         for (let dish of foundedDishes) {
            const iikoId = dish['dish.iiko_id']
            const checkStopList = await this.stopListRepo.checkStopListItem(iikoId)
            if(checkStopList) return
            dishes.push({
               name: dish['dish.name'],
               ingredients: dish['dish.ingredients'],
               kbzhu: dish['dish.kbzhu'],
               weight: dish['dish.weight'],
               price: dish['dish.price'],
               photo: dish['dish.photo_url'],
               iiko_id: iikoId,
               dish_id: dish['dish_id'],
            })
         }
      }
      return dishes
   }

   async findDish(name) {
      const result = []
      const founded = await this.dishRepo.findAll({
         where: {
            name: {
               [Op.iLike]: `%${name}%`,
            },
         }
      })
      if(founded.length > 0) {
         for (let dish of founded) {
            const category = await this.dishCatLinkRepo.findOne({
               where: {
                  dish_id: dish.id,
               }, include: [DishCategory]
            })
            result.push({
               name: dish.name,
               ingredients: dish.ingredients,
               kbzhu: dish.kbzhu,
               weight: dish.weight,
               price: dish.price,
               category: category.dishCategory.parent_name
            })
         }
      }
      return result
   }

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
            dish.checked = true
            this.dishRepo.update(dish, {
               where: {
                  id: dishExist.id
               }
            })
            await this.dishCatLinkRepo.update(
               { category_id: categoryId },
               { where: { dish_id: dishExist.id }}
            )

            // const existCatLink = await this.dishCatLinkRepo.findOne({
            //    where: {
            //       dish_id: dishExist.id
            //    }
            // })
            // existCatLink.category_id = categoryId
            // await existCatLink.save()
            // const { dishCategory } = await this.dishCatLinkRepo.findOne({
            //    where: {
            //       dish_id: dishExist.id
            //    }, include: [DishCategory],
            // })
            // const categoryData = {
            //    parent_name: dish.parent_name,
            //    sub_name: dish.sub_name
            // }
            // await this.dishCategoryRepo.updateCategory(categoryData, dishCategory.id)

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
   async findById(id) {
      return this.dishRepo.findOne({
         where: { id: id }
      })
   }
   async findByIiikoId(iiko_id) {
      return this.dishRepo.findOne({
         where: { iiko_id: iiko_id }
      })
   }
}
