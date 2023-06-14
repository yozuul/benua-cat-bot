import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'

import { Dish } from './dish.model'
import { Guest } from './guest.model'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'carts', timestamps: false })
export class Cart extends Model<Cart> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @ForeignKey(() => Guest)
   @Column({
      type: DataType.INTEGER, allowNull: false,
   }) guest_id: number;

   @ForeignKey(() => Dish)
   @Column({
      type: DataType.INTEGER, allowNull: false,
   }) dish_id: number;

   @Column({
      type: DataType.INTEGER, allowNull: false,
   }) quantity: number;

   @BelongsTo(() => Guest)
   guest: Guest;

   @BelongsTo(() => Dish)
   dish: Dish;
}
