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
        const getCategoryID = await CategoriesQuery.getCategoryIdBySlug(client, category_slug)

        const { data: product } = await client.from("products")
            .select("brand")
            .eq("category_id", getCategoryID?.id)

        console.log(product, getCategoryID)
    }

}