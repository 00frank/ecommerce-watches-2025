import { Database } from "./database.type";

export type CategoryDatabase = Database["public"]["Tables"]["categories"]["Row"]

interface Category extends CategoryDatabase {
    subCategories: Array<Category>
}


export default Category 