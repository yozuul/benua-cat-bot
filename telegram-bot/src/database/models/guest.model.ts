import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript'

import { Cart } from './cart.model'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'guests', timestamps: false })
export class Guest extends Model<Guest> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: true
   }) name: string

   @Column({
      type: STRING, allowNull: false
   }) tg_id: string

   @Column({
      type: STRING, allowNull: true
   }) phone: string

   @Column({
      type: BOOLEAN, allowNull: true, defaultValue: true
   }) signed_newsletter: boolean

   @HasMany(() => Cart)
   carts: Cart[];
}
