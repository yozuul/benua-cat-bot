import { Injectable, OnModuleInit } from '@nestjs/common'
import * as XLSX from 'xlsx'

import { DishRepo } from '@app/database/repo'

@Injectable()
export class ExcelUpdaterService implements OnModuleInit {
   constructor(
      private dishRepo: DishRepo,
   ) {}
   async parceTable() {
      const workbook = XLSX.readFile('data/all-dishes.xlsx')
      const sheetName = workbook.SheetNames[0]
      // Получаем первый лист рабочей книги
      const sheet = workbook.Sheets[sheetName]
      // Преобразуем лист в JSON-формат
      const data = XLSX.utils.sheet_to_json(sheet)
      // Перебираем все строки в полученном массиве
      for(const row of data) {
         const KBZHU = {
            k: row['Ккал'], b: row['Б'], z: row['Ж'], u: row['У']
         }
         const dish = {
            name: row['Название'],
            ingredients: row['INGREDIENTS'],
            parent_name: row['категория 1 уровня'],
            sub_name: row['категория 2 уровня'],
            weight: row['ГР'],
            price: row['руб'],
            kbzhu: '',
         }
         dish.kbzhu += `Энергетическая ценность порции: \n`
         dish.kbzhu += `б: ${KBZHU.b}, `
         dish.kbzhu += `ж: ${KBZHU.z}, `
         dish.kbzhu += `у: ${KBZHU.u}, `
         dish.kbzhu += `kkal: ${KBZHU.k}, `

         if(!dish.name || !dish.price || dish.parent_name === 'Архив') {
            break
         }
         await this.dishRepo.checkDish(dish)
      }
   }

   async onModuleInit() {
      // await this.dishRepo.checkDish({
      //    parentCategory: 'Test parent',
      //    subCategory: 'Test parent',
      // })

      await this.parceTable()
   }
}