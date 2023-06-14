import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { Cart, Dish, DishCategory, DishCategoryLink, Files, FilesRelated, Guest } from './models'
import { CartRepo, DishCategoryRepo, DishRepo, GuestRepo, PanelFilesRepo } from './repo'

const models = [
   Dish, Guest, Cart, DishCategory, DishCategoryLink, Files, FilesRelated
]
const repositories = [
   DishRepo, DishCategoryRepo, PanelFilesRepo, GuestRepo, CartRepo
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