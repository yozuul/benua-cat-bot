import { Injectable, OnModuleInit } from '@nestjs/common'
import * as XLSX from 'xlsx'

import { DishRepo } from '@app/database/repo'
import { IikoService } from 'src/iiko/iiko.service'

@Injectable()
export class ExcelUpdaterService implements OnModuleInit {
   constructor(
      private dishRepo: DishRepo,
      private iikoService: IikoService
   ) {}
   async parceTable() {
      const iikoMenu = await this.iikoService.getMenu()
      // console.log(iikoMenu)
      const workbook = XLSX.readFile('data/all-dishes.xlsx')
      const sheetName = workbook.SheetNames[0]
      // Получаем первый лист рабочей книги
      const sheet = workbook.Sheets[sheetName]
      // Преобразуем лист в JSON-формат
      const data = XLSX.utils.sheet_to_json(sheet)
      // Помечаем все блюда как не проверенные
      await this.dishRepo.switchChecked()
      // Перебираем все строки в полученном массиве
      for(const row of data) {
         const KBZHU = {
            k: toInt(row['Ккал']), b: toInt(row['Б']), z: toInt(row['Ж']), u: toInt(row['У'])
         }
         const dish = {
            name: row['наименование блюда'],
            ingredients: row['INGREDIENTS'],
            parent_name: row['категория 1 уровня'],
            sub_name: row['категория 2 уровня'],
            weight: row['ГР'],
            price: row['руб'],
            iiko_articul: row['артикул']?.toString(),
            iiko_id: null,
            photo_url: null,
            kbzhu: '',
         }
         dish.kbzhu += `Энергетическая ценность порции: `
         dish.kbzhu += `б: ${KBZHU.b}, `
         dish.kbzhu += `ж: ${KBZHU.z}, `
         dish.kbzhu += `у: ${KBZHU.u}, `
         dish.kbzhu += `Ккал: ${KBZHU.k}`

         if(dish.name && dish.price
            && dish.parent_name !== 'Архив'
            && KBZHU.k && KBZHU.b
            && dish.ingredients
         ) {
            if(dish.iiko_articul) {
               const iikoDish = iikoMenu.products.find((iikoDish) => {
                  return iikoDish.code ===  dish.iiko_articul
               })
               if(iikoDish) {
                  dish.iiko_id = iikoDish.id
                  dish.photo_url = iikoDish.imageLinks[0]
               }
            }
            await this.dishRepo.checkDish(dish)
         }
      }
      // Удаляем блюда, которые не прошли проверку (были удалены)
      await this.dishRepo.cleanUnchecked()
      function toInt(data) {
         return parseInt(data)
      }
   }

   async onModuleInit() {
      // await this.parceTable()
   }
}

