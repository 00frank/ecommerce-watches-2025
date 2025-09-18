import Link from "next/link"
import BrandFilter from "./components/BrandFilter"
import ClearFilters from "./components/ClearFilters"
import PriceFilter from "./components/PriceFilter"
import SortProducts from "./components/SortProducts"
import Container from "@/components/container"

const Filters = () => {
    return (
        <aside className="flex-[0.5] max-md:hidden  space-y-8">
            <ClearFilters />
            <BrandFilter />
            <PriceFilter />
        </aside>
    )
}


const productsCards = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `Reloj ${i + 1}`,
    description: `Reloj ${i + 1} de pulsera`,
    image: `/card-reloj.webp`,
}))

const Products = () => {
    return (
        <section className="flex-1 grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 gap-2 sm:gap-4">
            {
                productsCards.map(product => (
                    <article
                        key={product.id}
                        className="h-[350px] max-h-[350px]  rounded-sm overflow-hidden border flex flex-col items-stretch border-default-200">
                        <div className="flex-none">
                            <img src={product.image} className="object-contain w-full h-40" alt="" />
                        </div>
                        <div className="p-0 flex-1 px-4 ">
                            <h4 className="text-lg text-default-950">{product.name}</h4>
                            <p className="text-muted-foreground leading-5 break-words line-clamp-4">
                                {product.description} asda dasd asdsdasdasddasdasdasdasdasdsa dasdasdsdadasdasdasd
                            </p>
                        </div>
                        <div className="py-8 flex justify-center">
                            <Link className="text-primary-700 underline text-lg uppercase" href={`/productos/${product.id}`}>Ver mas</Link>
                        </div>
                    </article>
                ))
            }
        </section>
    )
}

export default function CategoryPage() {
    return (
        <Container
            as="main"
            className="min-h-[75dvh]  py-12 gap-8 flex flex-col">
            <section className="max-md:hidden flex justify-end items-center gap-8 flex-[0.1]">
                <SortProducts />
                <h4 className=" text-lg text-default-800">97 Productos</h4>
            </section>
            <div className="flex gap-8 flex-1 w-full ">
                <Filters />
                <Products />
            </div>
        </Container>

    )
}