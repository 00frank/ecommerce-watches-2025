import Container from "@/components/container";
import ProductsQuery from "@/lib/supabase/queries/products.query";
import { createClient } from "@/lib/supabase/server";
import { SearchParams } from "@/types/searchParams.type";
import NotFoundProduct from "../common/components/notFoundProduct";
import SearchProduct from "../common/components/SearchProduct";
import ProductList from "../common/container/product-list";

export default async function SearchPage({ searchParams: sp }: { searchParams: Promise<SearchParams> }) {

    const { brand = "", sort_by, query, page } = await sp

    const products = await ProductsQuery.getProducts(await createClient(), {
        filter: {
            brand: brand,
            product_name: query,
        },
        sort: sort_by,
        page: Number(page) || 0,
    })

    // const brands = await ProductsQuery.getBrandsCountsByName(await createClient(), { product_name: search })

    return (
        <Container>
            <header className="flex flex-col items-center gap-5 justify-center py-10 w-full">
                <h2 className="text-2xl ">Resultados de búsqueda</h2>
                <SearchProduct />
            </header>
            {products.length > 0 ?
                <ProductList
                    brands={[{ brand: "Casio", product_count: 0 }]}
                    products={products} />
                : <NotFoundProduct />
            }
        </Container>
    )
}