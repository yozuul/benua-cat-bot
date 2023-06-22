import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Files, FilesRelated, FilesUploaded } from '../models'

@Injectable()
export class FilesRelatedMorph {
   constructor(
      @InjectModel(Files)
      private filesRepo: typeof Files,
      @InjectModel(FilesRelated)
      private filesRelatedRepo: typeof FilesRelated,
      @InjectModel(FilesUploaded)
      private filesUploadedRepo: typeof FilesUploaded,
   ) {}

   async getLinkUrl() {
      return this.filesUploadedRepo.findOne({
         attributes: ['excel_url']
      })
   }

   async findFileUrlByFieldName(fieldName) {
      const fileApi = await this.filesRelatedRepo.findOne({
         where: {
            field: fieldName
         }
      })
      if(fileApi) {
         return this.filesRepo.findOne({
            where: {
               id: fileApi.file_id
            }
         })
      }
      return null
   }
   async findByNewlatedId(id) {
      const fileApi = await this.filesRelatedRepo.findOne({
         where: {
            related_id: id
         }
      })
      if(!fileApi) {
         return null
      }
      return this.filesRepo.findOne({
         where: {
            id: fileApi.file_id
         }
      })
   }

   async getFiles() {
      try {
         const filesData = await this.filesRelatedRepo.findAll({
            include: [Files],
            raw: true
         })
         return filesData
         // console.log(filesData[0].file)
      } catch (error) {
         console.log(error)
      }
   }
}
