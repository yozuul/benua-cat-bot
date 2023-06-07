import { Module } from '@nestjs/common';
import { ExcelUpdaterService } from './excel-updater.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
   imports: [
      DatabaseModule
   ],
   providers: [ExcelUpdaterService]
})
export class ExcelUpdaterModule {}
