import { Category } from "@/types";
import { buildCategoryTree } from "@/utils/buildCategoryTree.util";
import { SupabaseClient } from "@supabase/supabase-js";

export default class CategoriesQuery {

    static async getAllCategories(client: SupabaseClient) {
        const { data: categories } = await client
            .from('categories')
            .select('*')
            .order('id', { ascending: true })

        const categoriesTree = buildCategoryTree(categories as Array<Omit<Category, 'subCategories'>>)
        return categoriesTree
    }

    static async getCategoryIdBySlug(client: SupabaseClient, category_slug?: string) {
        const { data: category } = await client
            .from('categories')
            .select('id')
            .eq('slug', category_slug)
            .single()
        return category
    }

}