import { Column, DataType, Model, Table } from 'sequelize-typescript'


const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'orders', timestamps: false })
export class Order extends Model<Order> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: true,
   }) iiko_order_num: string;

   @Column({
      type: INTEGER, allowNull: false,
   }) iiko_order_id: number;

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
