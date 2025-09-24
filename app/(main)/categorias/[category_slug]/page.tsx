import Container from "@/components/container"
import { Params } from "@/types/params.type"
import { SearchParams } from "@/types/searchParams.type"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CategoriesQuery from "@/lib/supabase/queries/categories.query"
import ProductList from "../../common/container/product-list"

export default async function CategoryPage({ searchParams: sp, params: p }: { searchParams: Promise<SearchParams>, params: Promise<Params> }) {

    const { category_slug } = await p
    const { brand = "", sort_by } = await sp

    const categorias = await CategoriesQuery.getSubCategoriesIdsBySlug(await createClient(), category_slug || "")

    if (!categorias) return notFound()

    const products = await ProductsQuery.getProducts(await createClient(), {
        filter: {
            categories_id: categorias,
            brand: brand,
        },
        sort: sort_by
    })

    if (!products || products.length == 0) return notFound()

    const brands = await ProductsQuery.getBrandsCountsByCategoriesId(await createClient(), {
        categories_id: categorias
    })

    if (!brands) return notFound()

    return (
        <Container>
            <ProductList
                brands={brands}
                products={products} />
        </Container>
    )
}