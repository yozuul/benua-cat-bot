import { Body, Controller, Post, Get } from '@nestjs/common';

@Controller('iiko')
export class IikoController {

   @Post('/test')
   async test(@Body() body: any) {
      console.log('IikoController eventType', body[0].eventType)
      console.log('IikoController eventInfo', body[0].eventInfo)
   }
}