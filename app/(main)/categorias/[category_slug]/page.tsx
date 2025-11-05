import Container from "@/components/container"
import CategoriesQuery from "@/lib/supabase/queries/categories.query"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { createClient } from "@/lib/supabase/server"
import { Params } from "@/types/params.type"
import { SearchParams } from "@/types/searchParams.type"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductList from "../../common/container/product-list"

interface CategoryPageProps {
    searchParams: Promise<SearchParams>
    params: Promise<Params>
}

export async function generateMetadata({ params: p }: CategoryPageProps): Promise<Metadata> {
    const { category_slug = "" } = await p
    const client = await createClient()
    const category = await CategoriesQuery.getCategoryBySlug(client, category_slug)
    
    if (!category) return {}
    
    return {
        title: category.meta_title || "",
        description: category.meta_description || `Explora nuestra colección de ${category.title}`,
        openGraph: {
            title: category.meta_title || "",
            description: category.meta_description || `Explora nuestra colección de ${category.title}`,
        }
    }
}

export default async function CategoryPage({ searchParams: sp, params: p }: CategoryPageProps) {

    const { category_slug = "" } = await p
    const { brand = "", sort_by, page } = await sp

    const normalizedPage = Number(page) || 0
    const normalizedBrand = Array.isArray(brand) ? brand : brand ? [brand] : undefined

    const client = await createClient()

    const category = await CategoriesQuery.getCategoryBySlug(client, category_slug)

    const categorias = await CategoriesQuery.getSubCategoriesIdsBySlug(client, category_slug)

    const count_info = await ProductsQuery.getProductCounts(client, {
        brand: normalizedBrand,
        categories_id: categorias,
    })

    if (!categorias) return notFound()

    const products = await ProductsQuery.getProducts(client, {
        filter: {
            categories_id: categorias,
            brand: normalizedBrand,
        },
        sort: sort_by,
        page: normalizedPage
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
                    current_page: normalizedPage,
                }}
                product_count={count_info.total_products} />
        </Container>
    )
}