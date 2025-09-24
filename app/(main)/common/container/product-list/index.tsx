import SortProducts from "./components/SortProducts";
import Products from "./components/Products";
import BrandFilter from "./components/BrandFilter";
import { ProductDatabase } from "@/types/product.interface";


interface Props {
    brands: { brand: string, product_count: number }[],
    products: Array<ProductDatabase>
}

export default function ProductList({ brands, products }: Props) {

    return (
        <main
            className="min-h-[75dvh] py-12 gap-8 flex flex-col">
            <section className="flex justify-between flex-wrap md:justify-end items-center gap-8 flex-[0.1]">
                <SortProducts />
                <h4 className="text-default-800 font-medium">{0} Productos</h4>
            </section>
            <div className="flex flex-col md:flex-row flex-1 gap-8  w-full ">
                <aside className="max-w-[275px] w-full space-y-8">
                    <BrandFilter brands={brands} />
                </aside>
                <Products products={products} />
            </div>
        </main>
    )
}