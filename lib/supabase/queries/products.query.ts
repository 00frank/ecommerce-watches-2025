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
    const category = await CategoriesQuery.getCategoryBySlug(client, category_slug)
    console.log("category", category)
    const subCategories = await CategoriesQuery.getSubCategoriesByParentId(client, category.id)
    let categoryIds = []
    if (subCategories && subCategories.length > 0) {
      categoryIds = subCategories.map((item) => item.id)
    } else {
      categoryIds = [category.id]
    }

    let query = client
      .from("products")
      .select(`
            *,
            category:categories(slug)
                `)

    if (category_slug) {
      query = query.in("category_id", categoryIds)
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
    let categoryIds = []

    // verificar si la categoria tiene parent_id, si es nulo, comprobar si hay registros de category con dicho parent_id
    if (!category.parent_id) {
      const { data } = await client
        .from('categories')
        .select('id')
        .eq('parent_id', category.id)

      if (data !== null && data.length > 0) {
        // selected parent category (retrieve subcategories)
        categoryIds = data.map((item) => item.id)
      } else {
        // selected category without subcategories
        categoryIds = [category.id]
      }
    } else {
      // selected subcategory
      categoryIds = [category.id]
    }

    const { data, error } = await client
      .rpc('get_brands_by_category_id', {
        categories_id: categoryIds
      });
      
    console.log("brands", data) 
    if (error) {
      console.error(error)
      return []
    }

    return data || []

  }

}