import ProductSortTypes from "@/types/productSort.type";
import { SupabaseClientType } from "@/types/supabaseClient.type";


interface ProductFilter {
  categories_id?: Array<number>,
  brand?: Array<string> | string,
  product_name?: string
}


export default class ProductsQuery {

  private static getSortQuery(sort: ProductSortTypes): { column: string, ascending: boolean } {
    if (sort === "date-asc") return { column: "created_at", ascending: true }
    if (sort === "alpha-asc") return { column: "name", ascending: true }
    if (sort === "alpha-desc") return { column: "name", ascending: false }

    return { column: "created_at", ascending: false } //Por defecto data-desc
  }

  static async getProducts(
    client: SupabaseClientType,
    {
      filter,
      sort = "date-desc",
      page = 0
    }: {
      filter: ProductFilter,
      sort?: ProductSortTypes
      page?: number
    }
  ) {

    const { brand, product_name, categories_id } = filter

    const limit = 15
    const rangeFrom = page * limit
    const rangeTo = rangeFrom + (limit - 1)

    const sortQuery = this.getSortQuery(sort)
    let query = client
      .from("products")
      .select("*, category:categories(slug)")
      .range(rangeFrom, rangeTo)
      .order(sortQuery.column, { ascending: sortQuery.ascending })

    if (categories_id) {
      query = query.in("category_id", categories_id)
    }

    if (brand) {
      query = query.in("brand", Array.isArray(brand) ? brand : [brand])
    }

    if (product_name) {
      query = query.ilike("name", `%${product_name}%`)
    }

    const { data } = await query

    return data || []
  }


  static async getBrandsCountsByName(
    client: SupabaseClientType,
    {
      product_name
    }: {
      product_name?: string
    }
  ) {

    let query = client
      .from("products")
      .select("brand, SUM(quantity) as product_count")

    if (product_name) {
      query = query.ilike("name", `%${product_name}%`)
    }

    const { data } = await query
    return data
  }


  static async getBrandsCountsByCategoriesId(
    client: SupabaseClientType,
    {
      categories_id
    }: {
      categories_id: Array<number>
    }
  ) {

    const { data } = await client
      .rpc('get_brands_by_category_id', {
        categories_id: categories_id
      });

    return data

  }

  static async getProductBySku(
    client: SupabaseClientType,
    {
      sku
    }: {
      sku: string
    }
  ) {
    const { data } = await client
      .from("products")
      .select("*")
      .eq("sku", sku)
      .single()

    return data
  }

}