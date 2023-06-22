import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { StopList } from '../models'
import { DishRepo } from './dish.repo'
// import { IikoService } from 'src/iiko/iiko.service'

@Injectable()
export class StopListRepo {
   constructor(
      @InjectModel(StopList)
      private stopListRepo: typeof StopList,
      // private dishRepo: DishRepo
      // private iikoService: IikoService
   ) {}

   async updateStopList(getGrillItems) {
      if(getGrillItems?.items?.length > 0) {
         const stopListDishes = []
         try {
            await this.stopListRepo.destroy({
               truncate: true
            })
         } catch (error) {
            console.log('Ошибка очистки')
         }
         for (let item of getGrillItems.items) {
            // const dish = await this.dishRepo.findByIiikoId(item.productId)
            // console.log(dish)
            stopListDishes.push({
               // name: dish.name,
               iiko_id: item.productId
            })
         }
         await this.stopListRepo.bulkCreate(stopListDishes)
      }
   }
   async checkStopListItem(iikoId) {
      return this.stopListRepo.findOne({
         where: {
            iiko_id: iikoId
         }
      })
   }
}
