import Container from "@/components/container"
import ProductCard from "@/app/(main)/common/components/productCard"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { createClient } from "@/lib/supabase/server"
import { Params } from "@/types/params.type"
import { ProductDatabase } from "@/types/product.interface"
import clsx from "clsx"
import Image from "next/image"
import { notFound } from "next/navigation"

const ImageContainer = ({ image_url, name }: Pick<ProductDatabase, "image_url" | "name">) => {
    return (
        <section className="flex-1 border-1 border-black/5 rounded-xs ">
            <Image
                src={image_url || ""}
                alt={name || ""}
                className="m-auto h-full w-full object-contain"
                width={1920}
                height={1080} />
        </section>
    )
}

interface ProductInfoProps extends Omit<ProductDatabase, "image_url"> { }

const ProductInfo = ({
    brand,
    name,
    quantity,
    description
}: ProductInfoProps) => {
    return (
        <section className="flex-1 p-6 flex  gap-10 flex-col">
            <header className="space-y-2">
                <div>
                    <h1 className="text-[12px] font-semibold tracking-wide text-default-500 uppercase">{brand}</h1>
                    <h2 className="uppercase text-4xl font-bold">{name}</h2>
                </div>
                <p className="text-default-600">{description}</p>
            </header>
            <p className={
                clsx(
                    !quantity ? "line-through" : "",
                    "text-default-800"
                )}>
                Stock:
                <span className="font-semibold text-black"> {quantity ? "Disponible" : "No disponible"}</span>
            </p>
            <button className="cursor-pointer hover:scale-95 duration-200 transition-all h-[60px] w-full md:w-[300px]">
                <a className="w-full h-full  rounded-sm hover:bg-primary-700 hover:text-white border border-primary-700 text-primary-700 px-6 py-2 flex items-center justify-center" href="/carrito">
                    Comprar ahora
                </a>
            </button>
        </section>
    )
}

const ProductRecommendations = ({ products }: { products: ProductDatabase[] }) => {
    return (
        <section className="flex-1 flex  gap-10 flex-col">
            <header>
                <h2 className="text-2xl font-medium">
                    Productos recomendados
                </h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-5   gap-2 sm:gap-4">
                {
                    products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                }
            </div>
        </section>
    )
}

export default async function ProductPage({ params }: { params: Params }) {

    const { product_sku = "" } = params

    const product = await ProductsQuery.getProductBySku(await createClient(), { sku: product_sku })

    if (!product) return notFound()

    return (
        <Container
            as="div"
            className="p-8 my-10 gap-10 flex flex-col">
            <main className="gap-8 w-full min-h-[60dvh] md:max-h-[60dvh]  flex-col md:flex-row flex">
                <ImageContainer image_url={product.image_url} name={product.name} />
                <ProductInfo {...product} />
            </main>
            <ProductRecommendations products={[product]} />
        </Container>
    )
}