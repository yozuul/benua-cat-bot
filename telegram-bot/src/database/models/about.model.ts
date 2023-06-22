import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

@Table({ tableName: 'abouts', timestamps: false })
export class About extends Model<About> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: true
   }) about_text: string
}
