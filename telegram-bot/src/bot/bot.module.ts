import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/database/database.module'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { NavigationKeyboard } from '@bot/keyboards'
import {
   UserStartedScene, UserMenuScene, UserAboutScene, UserMenuWeeklyScene, UserPromoScene, UserMenuGrillScene, UserMenuCoffeeScene, UserKbzhuScene, UserCartScene, UserMenuGrillOrderScene
} from './scenes'
import { IikoModule } from 'src/iiko/iiko.module'

@Module({
   imports: [
      DatabaseModule, IikoModule
   ],
   providers: [
      BotService, BotUpdate,
      UserStartedScene, UserMenuScene, UserAboutScene, UserKbzhuScene, UserPromoScene, UserCartScene,
      UserMenuGrillScene, UserMenuWeeklyScene, UserMenuCoffeeScene,
      UserMenuGrillOrderScene,
      NavigationKeyboard
   ]
})

export class BotModule {}
