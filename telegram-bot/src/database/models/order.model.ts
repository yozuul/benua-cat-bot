import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'

import { Dish } from './dish.model'
import { Guest } from './guest.model'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'orders', timestamps: false })
export class Order extends Model<Order> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false,
   }) iiko_order_id: string;

   @Column({
      type: BOOLEAN, allowNull: false, defaultValue: false
   }) done: boolean;

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) created_by_id: number;

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) updated_by_id: number;
}
