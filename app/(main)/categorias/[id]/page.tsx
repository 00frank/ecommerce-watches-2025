import BrandFilter from "./components/BrandFilter"
import SortProducts from "./components/SortProducts"
import PriceFilter from "./components/PriceFilter"
import ClearFilters from "./components/ClearFilters"

const Filters = () => {

    return (
        <aside className=" flex-[0.3] space-y-4">
            <ClearFilters />
            <BrandFilter />
            <PriceFilter />
        </aside>
    )
}

const Products = () => {
    return (
        <section className="bg-red-500 flex-1">

        </section>
    )
}



export default function CategoryPage() {
    return (
        <main className="min-h-[75dvh] p-4 w-full mx-auto max-w-7xl flex flex-col">
            <section className=" flex justify-end items-center gap-8 flex-[0.1]">
                <SortProducts />
                <h4 className=" text-lg text-default-800">97 Productos</h4>
            </section>
            <div className="flex gap-8 flex-1 w-full 0">
                <Filters />
                <Products />
            </div>
        </main>

    )
}