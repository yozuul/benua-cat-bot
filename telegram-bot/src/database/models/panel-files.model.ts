import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript'
import { FilesRelated } from './panel-files-related.model'

const { INTEGER, STRING } = DataType

@Table({ tableName: 'files', timestamps: false })
export class Files extends Model<Files> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) name: string

   @Column({
      type: STRING, allowNull: false
   }) url: string

   @HasOne(() => FilesRelated)
   fileRelated: FilesRelated;
}
