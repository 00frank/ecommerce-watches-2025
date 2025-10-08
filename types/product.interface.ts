import Category from "./category.interface";
import { Database } from "./database.type";

export type ProductDatabase = Database["public"]["Tables"]["products"]["Row"]

interface Product extends ProductDatabase {
    category: Category
}

export default Product 