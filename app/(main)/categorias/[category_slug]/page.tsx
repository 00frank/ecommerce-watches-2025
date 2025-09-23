import Container from "@/components/container"
import BrandFilter from "./components/BrandFilter"
import ClearFilters from "./components/ClearFilters"
import FiltersDrawer from "./components/FilterDrawer"
import Products from "./components/Products"
import SortProducts from "./components/SortProducts"
import { Params } from "@/types/params.type"
import { SearchParams } from "@/types/searchParams.type"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { createClient } from "@/utils/supabase/server"


export default async function CategoryPage({ searchParams: sp, params: p }: { searchParams: Promise<SearchParams>, params: Promise<Params> }) {

    const { category_slug } = await p
    const { brand, sort_by } = await sp

    const products = await ProductsQuery.getProducts(await createClient(), {
        filter: {
            category_slug: category_slug,
            brand: brand
        },
        sort: sort_by
    })

    const brands = await ProductsQuery.getDistinctProductBrands(await createClient(), {
        category_slug: category_slug
    })

    console.log(brands)

    return (
        <Container
            as="main"
            className="min-h-[75dvh]  py-12 gap-8 flex flex-col">
            <section className="flex justify-between flex-wrap md:justify-end items-center gap-8 flex-[0.1]">
                <FiltersDrawer />
                <SortProducts />
                <h4 className="text-default-800 font-medium">97 Productos</h4>
            </section>
            <div className="flex flex-1 gap-8  w-full ">
                <aside className="max-w-[275px] w-full max-md:hidden  space-y-8">
                    <ClearFilters />
                    {/* <BrandFilter brands={brands} /> */}
                </aside>
                <Products products={products} />
            </div>
        </Container>

    )
}