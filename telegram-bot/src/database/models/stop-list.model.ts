import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript'


const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'stop_lists', timestamps: false })
export class StopList extends Model<StopList> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false,
   }) name: string;

   @Column({
      type: STRING, allowNull: false,
   }) iiko_id: string;
}
