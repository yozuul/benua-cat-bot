import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Files, FilesRelated } from '../models'

@Injectable()
export class PanelFilesRepo {
   constructor(
      @InjectModel(Files)
      private FilesRepo: typeof Files,
      @InjectModel(FilesRelated)
      private filesRelatedRepo: typeof FilesRelated,
   ) {}

   async getFiles() {
      try {
         const filesData = await this.filesRelatedRepo.findAll({
            include: [Files]
         })
         // console.log(filesData[0].file)
      } catch (error) {
         console.log(error)
      }
   }
}
