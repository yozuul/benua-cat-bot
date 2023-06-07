import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript'
import { DishCategory } from './dish-category.model'
import {DishDishCategoryLink} from './dish_dish-category_link.model'

const { INTEGER, TEXT, STRING, DATE } = DataType

interface DishesCreationAttrs {
   closed: boolean
   reason: string
}

@Table({ tableName: 'dishes', timestamps: false })
export class Dish extends Model<Dish> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) name: string

   @Column({
      type: INTEGER, allowNull: false
   }) price: number

   @Column({
      type: INTEGER, allowNull: true
   }) weight: number

   @Column({
      type: TEXT, allowNull: true
   }) ingredients: string

   @Column({
      type: STRING, allowNull: true
   }) kbzhu: string

   @Column({
      type: STRING, allowNull: true
   }) iiko_id: string

   @Column({
      type: DATE, allowNull: false, defaultValue: new Date
   }) created_at: Date

   @Column({
      type: DATE, allowNull: false, defaultValue: new Date
   }) published_at: Date

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) created_by_id: number

   @BelongsToMany(() => DishCategory, () => DishDishCategoryLink)
   dishCategories: DishCategory[];
}
