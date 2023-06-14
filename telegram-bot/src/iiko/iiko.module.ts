import { Module } from '@nestjs/common';

import { IikoController } from './iiko.controller';
import { IikoService } from './iiko.service';
import { DatabaseModule } from '@app/database/database.module';

@Module({
   imports: [
      DatabaseModule
   ],
   controllers: [IikoController],
   providers: [IikoService],
   exports: [IikoService]
})
export class IikoModule {}
