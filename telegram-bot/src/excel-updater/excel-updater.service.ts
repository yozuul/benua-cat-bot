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
            iiko_id: row['артикул'],
            kbzhu: '',
         }
         dish.kbzhu += `Энергетическая ценность порции: \n`
         dish.kbzhu += `б: ${KBZHU.b}, `
         dish.kbzhu += `ж: ${KBZHU.z}, `
         dish.kbzhu += `у: ${KBZHU.u}, `
         dish.kbzhu += `ккал: ${KBZHU.k}, `

         if(dish.name && dish.price
            && dish.parent_name !== 'Архив'
            && KBZHU.k && KBZHU.b
            && dish.ingredients
         ) {
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
      await this.parceTable()
   }
}

