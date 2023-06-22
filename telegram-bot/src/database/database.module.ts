import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import {
   About,
   Cart, Dish, DishCategory, DishCategoryLink, DishOrderIdLink, Files, FilesRelated, FilesUploaded, Guest, NewsLetter, Order, OrderGuestIdLink, StopList
} from './models'
import {
   CartRepo, DishCategoryRepo, DishRepo, GuestRepo, NewsLetterRepo, OrdersRepo, FilesRelatedMorph, StopListRepo, AboutRepo
} from './repo'

const models = [
   Dish, Guest, Cart, DishCategory, DishCategoryLink, Files, FilesRelated, Order, OrderGuestIdLink, DishOrderIdLink, FilesUploaded, NewsLetter, StopList, About
]
const repositories = [
   DishRepo, DishCategoryRepo, FilesRelatedMorph, GuestRepo, CartRepo, OrdersRepo, NewsLetterRepo, StopListRepo, AboutRepo
]
@Module({
   imports: [
      SequelizeModule.forFeature(models),
      SequelizeModule.forRootAsync({
         imports: [ConfigModule],
         useFactory: async (config: ConfigService) => ({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: config.get<string>('DATABASE_PASS'),
            database: config.get<string>('DATABASE_NAME'),
            autoLoadModels: true,
            logging: false,
            synchronize: true,
         }),
         inject: [ConfigService],
      }),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
   ],
   providers: repositories,
   exports: repositories
})

export class DatabaseModule {}