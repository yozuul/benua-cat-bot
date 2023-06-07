import { Body, Controller, Post, Get } from '@nestjs/common';

@Controller('iiko')
export class IikoController {

   @Post('/test')
   async test(@Body() body: any) {
      console.log('IikoController eventType', ...body.eventType)
      console.log('IikoController eventInfo', ...body.eventInfo)
   }
}