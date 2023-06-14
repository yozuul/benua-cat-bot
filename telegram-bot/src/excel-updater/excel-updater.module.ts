import { Module } from '@nestjs/common'

import { ExcelUpdaterService } from './excel-updater.service'
import { DatabaseModule } from 'src/database/database.module'
import { IikoModule } from 'src/iiko/iiko.module'

@Module({
   imports: [
      DatabaseModule, IikoModule
   ],
   providers: [ExcelUpdaterService]
})
export class ExcelUpdaterModule {}
