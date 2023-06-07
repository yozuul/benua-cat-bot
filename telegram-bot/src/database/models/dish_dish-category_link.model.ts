import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Dish } from './dish.model';
import { DishCategory } from './dish-category.model';

const { INTEGER, BOOLEAN, STRING } = DataType

interface DishesCategoriesCreationAttrs {
   closed: boolean
   reason: string
}

@Table({ tableName: 'dishes_dish_category_id_links', timestamps: false })
export class DishDishCategoryLink extends Model<DishDishCategoryLink> {
   @ForeignKey(() => Dish)
   @Column
   dish_id: number;

   @ForeignKey(() => DishCategory)
   @Column
   dishes_category_id: number;

   @BelongsTo(() => Dish)
   dish: Dish;

   @BelongsTo(() => DishCategory)
   dishCategory: DishCategory;
}
