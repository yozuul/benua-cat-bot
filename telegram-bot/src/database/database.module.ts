import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import {
   Cart, Dish, DishCategory, DishCategoryLink, DishOrderIdLink, Files, FilesRelated, FilesUploaded, Guest, NewsLetter, Order, OrderGuestIdLink
} from './models'
import {
   CartRepo, DishCategoryRepo, DishRepo, GuestRepo, NewsLetterRepo, OrdersRepo, PanelFilesRepo
} from './repo'

const models = [
   Dish, Guest, Cart, DishCategory, DishCategoryLink, Files, FilesRelated, Order, OrderGuestIdLink, DishOrderIdLink, FilesUploaded, NewsLetter
]
const repositories = [
   DishRepo, DishCategoryRepo, PanelFilesRepo, GuestRepo, CartRepo, OrdersRepo, NewsLetterRepo
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