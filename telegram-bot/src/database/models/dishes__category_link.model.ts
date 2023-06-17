import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Dish } from './dish.model';
import { DishCategory } from './dish-category.model';

const { INTEGER, BOOLEAN, STRING } = DataType

@Table({ tableName: 'dishes_category_id_links', timestamps: false })
export class DishCategoryLink extends Model<DishCategoryLink> {
   @ForeignKey(() => Dish)
   @Column({
      type: INTEGER,
   }) dish_id: number;

   @ForeignKey(() => DishCategory)
   @Column({
      type: INTEGER,
   }) category_id: number;

   @BelongsTo(() => Dish)
   dish: Dish;

   @BelongsTo(() => DishCategory)
   dishCategory: DishCategory;
}
