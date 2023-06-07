import { Module } from '@nestjs/common';
import { IikoController } from './iiko.controller';
import { IikoService } from './iiko.service';

@Module({
  controllers: [IikoController],
  providers: [IikoService]
})
export class IikoModule {}
