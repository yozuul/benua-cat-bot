import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TelegrafModule } from 'nestjs-telegraf'
import * as LocalSession from 'telegraf-session-local'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IikoModule } from './iiko/iiko.module';
import { DatabaseModule } from './database/database.module';
import { ExcelUpdaterModule } from './excel-updater/excel-updater.module';
import { BotModule } from './bot/bot.module';

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: ".env",
      }),
      TelegrafModule.forRoot({
         middlewares: [sessions.middleware()],
         token: process.env.BOT_TOKEN2,
      }),
      ScheduleModule.forRoot(),
      IikoModule,
      DatabaseModule,
      ExcelUpdaterModule,
      BotModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
