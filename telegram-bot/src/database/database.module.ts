import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { Dish, DishCategory, DishCategoryLink, Files, FilesRelated } from './models'
import { DishCategoryRepo, DishRepo, PanelFilesRepo } from './repo'

const models = [
   Dish, DishCategory, DishCategoryLink, Files, FilesRelated
]
const repositories = [
   DishRepo, DishCategoryRepo, PanelFilesRepo
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