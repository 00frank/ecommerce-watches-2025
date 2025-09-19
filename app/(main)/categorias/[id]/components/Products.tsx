import ProductCard from "@/components/productCard"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import productMock from "@/mocks/product.mock"

const productsCards = Array.from({ length: 20 }).map((_, i) => ({
    ...productMock,
    id: i + 1,
}))

export default function Products() {
    return (
        <section className="flex w-full justify-end gap-12 flex-col">
            <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 gap-2 sm:gap-4">
                {
                    productsCards.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                }
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink isActive href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    )
}