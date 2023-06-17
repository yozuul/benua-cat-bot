import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'orders_guest_id_links', timestamps: false })
export class OrderGuestIdLink extends Model<OrderGuestIdLink> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: INTEGER, allowNull: false,
   }) order_id: number

   @Column({
      type: INTEGER, allowNull: false,
   }) guest_id: number

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) order_order: number
}
