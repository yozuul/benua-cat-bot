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
   async findByName(name) {
      const categoriesName = {
         omlet: 'Омлеты и яичницы',
         eggs: 'Яйца пашот',
         tosts: 'Тосты',
         meat: 'Мясо и птица',
         fish: 'Рыба',
         burger: 'Бургеры',
         garnish: 'Гарнир',
         topping: 'Топпинг',
         vegan: 'Вегетарианские блюда',
         sause: 'Соус',
      }
      const founded = await this.dishCategoryRepo.findAll({
         where: {
            [Op.and]: [
                { parent_name: { [Op.iLike]: '%Гриль%' } },
                { sub_name: { [Op.like]: '%' + categoriesName[name] + '%' } },
            ]
         }, attributes: ['id']
      })
      return founded
   }
   async updateCategory(data, id) {
      await this.dishCategoryRepo.update(data, {
         where: { id: id  }
      })
   }
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
