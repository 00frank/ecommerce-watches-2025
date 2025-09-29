import ProductCard from "@/app/(main)/common/components/productCard"
import { ProductDatabase } from "@/types/product.interface"

interface ProductsProps {
    products: ProductDatabase[],
}

export default function Products({ products }: ProductsProps) {


    return (
        <div className="grid grid-cols-2 justify-start flex-1 sm:grid-cols-3  xl:grid-cols-4 gap-2 sm:gap-4">
            {
                products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))
            }
        </div>
    )
}