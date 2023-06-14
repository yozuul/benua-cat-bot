import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript'
import { Dish } from './dish.model'
import { DishCategoryLink } from './dishes__category_link.model'

const { INTEGER, STRING, DATE, BOOLEAN } = DataType

@Table({ tableName: 'categories', timestamps: false })
export class DishCategory extends Model<DishCategory> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) parent_name: string

   @Column({
      type: STRING, allowNull: false
   }) sub_name: string

   @Column({
      type: DATE, allowNull: false, defaultValue: new Date
   }) created_at: Date

   @Column({
      type: DATE, allowNull: false, defaultValue: new Date
   }) published_at: Date

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) created_by_id: number

   @BelongsToMany(() => Dish, () => DishCategoryLink)
   dishes: Dish[]
}
