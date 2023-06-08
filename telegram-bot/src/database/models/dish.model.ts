import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript'

import { DishCategory } from './dish-category.model'
import { DishCategoryLink } from './dishes__category_link.model'

const { INTEGER, TEXT, STRING, DATE, BOOLEAN } = DataType

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
      type: TEXT, allowNull: true
   }) ingredients: string

   @Column({
      type: STRING, allowNull: true
   }) kbzhu: string

   @Column({
      type: INTEGER, allowNull: false
   }) price: number

   @Column({
      type: INTEGER, allowNull: true
   }) weight: number

   @Column({
      type: STRING, allowNull: true
   }) iiko_articul: string

   @Column({
      type: BOOLEAN, allowNull: false, defaultValue: true
   }) checked: boolean

   @Column({
      type: DATE, allowNull: false, defaultValue: new Date
   }) created_at: Date

   @Column({
      type: INTEGER, allowNull: false, defaultValue: 1
   }) created_by_id: number

   @BelongsToMany(() => DishCategory, () => DishCategoryLink)
   dishCategories: DishCategory[];
}
