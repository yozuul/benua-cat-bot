import { Column, DataType, Model, Table, HasMany, AfterCreate  } from 'sequelize-typescript'

import { Cart } from './cart.model'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'mails', timestamps: false })
export class NewsLetter extends Model<NewsLetter> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: true
   }) header: string

   @Column({
      type: STRING, allowNull: false
   }) text: string

   @Column({
      type: BOOLEAN, allowNull: false
   }) sended: boolean
}
