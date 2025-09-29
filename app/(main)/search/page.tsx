import Container from "@/components/container";
import ProductsQuery from "@/lib/supabase/queries/products.query";
import { createClient } from "@/lib/supabase/server";
import { SearchParams } from "@/types/searchParams.type";
import NotFoundProduct from "../common/components/notFoundProduct";
import SearchProduct from "../common/components/SearchProduct";
import ProductList from "../common/container/product-list";

export default async function SearchPage({ searchParams: sp }: { searchParams: Promise<SearchParams> }) {

    const { brand = "", sort_by, query, page } = await sp

    const normalizedPage = Number(page) || 0

    const client = await createClient()

    const products = await ProductsQuery.getProducts(client, {
        filter: {
            brand: brand,
            product_name: query,
        },
        sort: sort_by,
        page: normalizedPage,
    })

    const brands = await ProductsQuery.getBrandsByProductName(client, query || "")

    const countInfo = await ProductsQuery.getProductCounts(client, {
        brand: brand,
        product_name: query
    })

    return (
        <Container>
            <header className="flex flex-col items-center gap-5 justify-center py-10 w-full">
                <h2 className="text-2xl">Resultados de búsqueda</h2>
                <SearchProduct />
            </header>
            {products.length > 0 ?
                <ProductList
                    brands={brands}
                    products={products}
                    product_count={countInfo.count}
                    pagination_info={{
                        total_pages: countInfo.total_pages,
                        current_page: normalizedPage
                    }}

                />
                : <NotFoundProduct />
            }
        </Container>
    )
}