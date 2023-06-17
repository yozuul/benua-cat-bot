import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Dish } from './dish.model';
import { DishCategory } from './dish-category.model';

const { INTEGER, BOOLEAN, STRING } = DataType

@Table({ tableName: 'dishes_order_id_links', timestamps: false })
export class DishOrderIdLink extends Model<DishOrderIdLink> {
   @Column({
      type: INTEGER,
   }) dish_id: number;

   @Column({
      type: INTEGER,
   }) order_id: number;

   @Column({
      type: INTEGER,
   }) dish_order: number;
}
