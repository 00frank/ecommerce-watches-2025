import Container from "@/components/container"
import { Params } from "@/types/params.type"
import { SearchParams } from "@/types/searchParams.type"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CategoriesQuery from "@/lib/supabase/queries/categories.query"
import ProductList from "../../common/container/product-list"

export default async function CategoryPage({ searchParams: sp, params: p }: { searchParams: Promise<SearchParams>, params: Promise<Params> }) {

    const { category_slug = "" } = await p
    const { brand = "", sort_by } = await sp

    const client = await createClient()

    const categorias = await CategoriesQuery.getSubCategoriesIdsBySlug(client, category_slug)

    const count_info = await ProductsQuery.getProductCounts(client, {
        brand: brand,
        categories_id: categorias,
    })

    if (!categorias) return notFound()

    const products = await ProductsQuery.getProducts(client, {
        filter: {
            categories_id: categorias,
            brand: brand,
        },
        sort: sort_by
    })

    if (!products || products.length == 0) return notFound()

    const brands = await ProductsQuery.getBrandsByCategoriesId(client, {
        categories_id: categorias
    })

    if (!brands) return notFound()

    return (
        <Container>
            <ProductList
                brands={brands}
                products={products}
                pagination_info={{
                    total_pages: count_info.total_pages,
                    current_page: 1
                }}
                product_count={count_info.count} />
        </Container>
    )
}