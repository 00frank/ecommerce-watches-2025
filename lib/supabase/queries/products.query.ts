import { Product } from "@/types";
import { CategoryDatabase } from "@/types/category.interface";
import { ProductDatabase } from "@/types/product.interface";
import ProductSortTypes from "@/types/productSort.type";
import { SupabaseClientType } from "@/types/supabaseClient.type";


interface ProductFilter {
  categories_id?: Array<number>,
  brand?: Array<string>,
  product_name?: string
}

const ITEMS_PER_PAGE = 15

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

    const rangeFrom = page * ITEMS_PER_PAGE
    const rangeTo = rangeFrom + (ITEMS_PER_PAGE - 1)

    const sortQuery = this.getSortQuery(sort)
    let query = client
      .from("products")
      .select("*")
      .range(rangeFrom, rangeTo)
      .order(sortQuery.column, { ascending: sortQuery.ascending })
      .filter("is_active", "eq", true)

    if (categories_id) {
      query = query.in("category_id", categories_id)
    }

    if (brand) {
      query = query.in("brand", brand)
    }

    if (product_name) {
      query = query.ilike("name", `%${product_name}%`)
    }

    const { data } = await query

    return data || []
  }


  static async getProductCounts(
    client: SupabaseClientType,
    {
      brand,
      categories_id,
      product_name
    }: ProductFilter
  ) {
    let query = client
      .from("products")
      .select("", { count: "exact", head: true })
      .filter("is_active", "eq", true)

    if (brand) {
      query = query.in("brand", brand)
    }

    if (categories_id) {
      query = query.in("category_id", categories_id)
    }

    if (product_name) {
      query = query.ilike("name", `%${product_name}%`)
    }

    const { count: c } = await query
    const total_products = c || 0

    const isExact = total_products % ITEMS_PER_PAGE === 0

    return {
      total_products,
      total_pages: Math.floor(total_products / ITEMS_PER_PAGE) - (isExact ? 1 : 0),
    }
  }


  static async getBrandsByCategoriesId(
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

  static async getBrandsByProductName(
    client: SupabaseClientType,
    product_name: string
  ) {

    const { data } = await client
      .rpc('get_brands_by_product_name', {
        product_name: product_name
      })
    return data || []
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
      .select("*,category:categories(title,id)")
      .filter("is_active", "eq", true)
      .eq("sku", sku)
      .single()


    return data
  }

  static async getRecommendedProducts(
    client: SupabaseClientType
    , product: ProductDatabase & { category: Pick<CategoryDatabase, "title" | "id"> | null }) {

    const id = product.category?.id


    if (!product.name) return []

    const orFilters = product.name.split(" ").filter(b => b.length > 2).map(b => `name.ilike.%${b}%`).join(',');

    const { data } = await client
      .from("products")
      .select("*")
      .neq("name", product.name)
      .or(`brand.ilike.%${product.brand}%,${orFilters},category_id.eq.${id}`)
      .eq("is_active", true)
      .limit(5)
    return data || []

  }


}