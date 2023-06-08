import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript'
import { Dish } from './dish.model'

const { INTEGER, STRING, DATE } = DataType

@Table({ tableName: 'weekly_menu', timestamps: false })
export class WeeklyMenu extends Model<WeeklyMenu> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) parent_name: string
}
