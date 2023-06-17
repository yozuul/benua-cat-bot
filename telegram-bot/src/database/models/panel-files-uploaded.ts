import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

@Table({ tableName: 'files_uploaded', timestamps: false })
export class FilesUploaded extends Model<FilesUploaded> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) excel_url: string

}
