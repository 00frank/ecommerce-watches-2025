
import SortProducts from "./components/SortProducts";
import Products from "./components/Products";
import BrandFilter from "./components/BrandFilter";
import { ProductDatabase } from "@/types/product.interface";
import { PaginationInfo } from "@/types/paginationInfo.interface";
import PaginationProducts from "./components/Pagintion";

interface Props {
    brands: { brand: string, product_count: number }[],
    products: Array<ProductDatabase>
    pagination_info: PaginationInfo
    product_count: number
}


export default function ProductList({ brands, products, pagination_info, product_count }: Props) {


    return (
        <main
            className="min-h-[75dvh] py-12 gap-8 flex flex-col">
            <section className="flex justify-between flex-wrap md:justify-end items-center gap-8 flex-[0.1]">
                <SortProducts />
                <h4 className="text-default-800 font-medium">{product_count} Productos</h4>
            </section>
            <div className="flex flex-col md:flex-row flex-1 gap-8  w-full ">
                <aside className="md:max-w-[275px] w-full space-y-8">
                    <BrandFilter brands={brands} />
                </aside>
                <section className="flex w-full justify-end gap-12 flex-col">
                    <Products
                        products={products} />
                    <PaginationProducts
                        pagination_info={pagination_info} />
                </section>
            </div>
        </main>
    )
}