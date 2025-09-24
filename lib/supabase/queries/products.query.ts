import { Product } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import CategoriesQuery from "./categories.query";

interface ProductFilter {
    category_slug?: string,
    brand?: string,
}

export default class ProductsQuery {

    static async getProducts(
        client: SupabaseClient,
        {
            filter,
            sort
        }: {
            filter: ProductFilter,
            sort?: string
        }
    ): Promise<Product[]> {

        const { category_slug, brand } = filter
        let query = client
            .from("products")
            .select(`
            *,
            category:categories(slug)
                `)

        if (category_slug) {
            query = query.eq("category.slug", category_slug)
        }

        if (brand) query = query.eq("brand", brand)

        const { data } = await query


        return data || []
    }


    static async getDistinctProductBrands(
        client: SupabaseClient,
        {
            category_slug
        }: {
            category_slug?: string
        }
    ): Promise<string[]> {
        // category
        const category = await CategoriesQuery.getCategoryBySlug(client, category_slug)
        let slugs = []

        // verificar si la categoria tiene parent_id, si es nulo, comprobar si hay registros de category con dicho parent_id
        if (!category.parent_id) {
            const { data } = await client
            .from('categories')
            .select('slug')
            .eq('parent_id', category.id)

            if (data !== null && data.length > 0) {
                // selected parent category (retrieve subcategories)
                slugs = data.map((item) => item.slug)
            } else {
                // selected category without subcategories
                slugs = [category.slug]
            }
        } else {
            // selected subcategory
            slugs = [category.slug]
        }
        
        const { data, error } = await client
        .rpc('get_brands_by_slug_param', {
          slugs: slugs
        });

        if (error) {
            console.error(error)
            return []
        }

        return data || []

    }

}