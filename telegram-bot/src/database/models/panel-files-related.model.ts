import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { Files } from './panel-files.model'

const { INTEGER, STRING } = DataType

@Table({ tableName: 'files_related_morphs', timestamps: false })
export class FilesRelated extends Model<FilesRelated> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) related_type: string

   @Column({
      type: STRING, allowNull: false
   }) field: string

   @ForeignKey(() => Files)
   @Column({
      type: INTEGER,
   }) file_id: number;

   @BelongsTo(() => Files)
   file: Files;
}
