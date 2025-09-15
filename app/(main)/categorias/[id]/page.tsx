import SortProducts from "./components/SortProducts"

const Filters = () => {
    return (
        <aside className="bg-blue-500 flex-1">

        </aside>
    )
}

const Products = () => {
    return (
        <section className="bg-red-500 flex-[0.3]">

        </section>
    )
}


const Sorts = () => {
    return (
        <section className=" flex justify-end items-center flex-[0.1]">
            <SortProducts />
        </section>
    )
}

export default function CategoryPage() {
    return (
        <main className="min-h-[75dvh] p-4 w-full mx-auto max-w-7xl flex flex-col">
            <Sorts />
            <div className="flex flex-1 w-full bg-red-500">
                <Products />
                <Filters />
            </div>
        </main>

    )
}