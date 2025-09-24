import { SupabaseClientType } from "@/types/supabaseClient.type";
import { buildCategoryTree } from "@/utils/buildCategoryTree.util";

export default class CategoriesQuery {

    static async getAllCategories(client: SupabaseClientType) {
        const { data: categories } = await client
            .from('categories')
            .select('*')
            .order('id', { ascending: true })

        if (!categories) return []

        const categoriesTree = buildCategoryTree(categories)
        return categoriesTree
    }

    static async getCategoryBySlug(client: SupabaseClientType, category_slug?: string) {
        let query = client
            .from('categories')
            .select('*')

        if (category_slug) {
            query = query.eq('slug', category_slug)
        }

        const { data: category } = await query.single()

        return category
    }

    static async getSubCategoriesIdsBySlug(client: SupabaseClientType, slug: string) {


        const category = await this.getCategoryBySlug(client, slug)

        if (!category) return

        let query = client
            .from('categories')
            .select('id')

        //Si es `parent_id` =  null es una categoria padre

        if (category.parent_id) {
            return [category.id]
        }

        const { data } = await query.eq('parent_id', category.id)

        if (data && data.length > 0) {
            return data.map((item) => item.id)
        } else {
            return [category.id]
        }


    }
}