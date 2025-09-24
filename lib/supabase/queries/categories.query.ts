import { Category } from "@/types";
import { buildCategoryTree } from "@/utils";
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

    static async getCategoryBySlug(client: SupabaseClient, category_slug?: string) {
        const { data: category } = await client
            .from('categories')
            .select('*')
            .eq('slug', category_slug)
            .single()
        return category
    }

    static async getSubCategoriesByParentId(client: SupabaseClient, parent_id?: number) {
        const { data } = await client
            .from('categories')
            .select('*')
            .eq('parent_id', parent_id)
        return data;
    }
}