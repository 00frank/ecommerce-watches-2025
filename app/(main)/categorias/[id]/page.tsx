import Container from "@/components/container"
import BrandFilter from "./components/BrandFilter"
import ClearFilters from "./components/ClearFilters"
import FiltersDrawer from "./components/FilterDrawer"
import PriceFilter from "./components/PriceFilter"
import Products from "./components/Products"
import SortProducts from "./components/SortProducts"

const Filters = () => {
    return (
        <aside className="max-w-[275px] w-full max-md:hidden  space-y-8">
            <ClearFilters />
            <BrandFilter />
            <PriceFilter />
        </aside>
    )
}

export default function CategoryPage() {
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
                <Filters />
                <Products />
            </div>
        </Container>

    )
}