import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/database/database.module'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { NavigationKeyboard } from '@bot/keyboards'
import {
   UserStartedScene, UserMenuScene, UserAboutScene, UserMenuWeeklyScene, UserMenuWeekly2Scene, UserPromoScene, UserMenuGrillScene, UserMenuCoffeeScene, UserMenuDailyScene, UserKbzhuScene, UserCartScene
} from './scenes'

@Module({
   imports: [
      DatabaseModule
   ],
   providers: [
      BotService, BotUpdate,
      UserStartedScene, UserMenuScene, UserAboutScene, UserKbzhuScene, UserPromoScene, UserCartScene,
      UserMenuGrillScene, UserMenuWeeklyScene, UserMenuWeekly2Scene, UserMenuDailyScene, UserMenuCoffeeScene,
      NavigationKeyboard
   ]
})
export class BotModule {}
