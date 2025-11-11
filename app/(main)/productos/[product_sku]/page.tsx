import ProductCard from "@/app/(main)/common/components/productCard"
import Container from "@/components/container"
import ProductsQuery from "@/lib/supabase/queries/products.query"
import { createClient } from "@/lib/supabase/server"
import { Category } from "@/types"
import { Params } from "@/types/params.type"
import { ProductDatabase } from "@/types/product.interface"
import clsx from "clsx"
import Image from "next/image"
import AskWhatsAppButton from "./components/AskWhatsAppButton"
import NotFoundProduct from "./not-found"

const ImageContainer = ({ image_url, name }: Pick<ProductDatabase, "image_url" | "name">) => {
    return (
        <section className="flex-1 border-1 border-black/5 rounded-xs ">
            <Image
                src={image_url || ""}
                alt={name || ""}
                className=" h-full w-full object-contain"
                width={1920}
                height={1080} />
        </section>
    )
}

type ProductInfoProps = Omit<ProductDatabase, "image_url"> & {
    category: Pick<Category, "title"> | null
}

const ProductInfo = ({
    brand,
    name,
    quantity,
    description,
    category
}: ProductInfoProps) => {

    return (
        <section className="flex-1 p-6 flex  gap-8 flex-col">
            <header className="space-y-2">
                <div>
                    <h1 className="text-[12px] font-semibold tracking-wide text-default-500 uppercase">
                        {brand === "Sin marca" ? "" : brand}
                    </h1>
                    <h2 className="uppercase text-4xl font-bold">{name}</h2>
                </div>
                <p className="prose max-w-none whitespace-pre-line text-default-600">{description}</p>
            </header>
            <p className={
                clsx(
                    !quantity ? "line-through" : "",
                    "text-default-800"
                )}>
                Stock:
                <span className="font-semibold text-black"> {quantity ? "Disponible" : "No disponible"}</span>
            </p>
            <AskWhatsAppButton product_name={name || ""} category_title={category?.title || ""} />
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

export default async function ProductPage({ params }: { params: Promise<Params> }) {

    const { product_sku = "" } = await params

    const normalizedSKU = decodeURIComponent(product_sku)

    const client = await createClient()

    const product = await ProductsQuery.getProductBySku(client, { sku: normalizedSKU })

    if (!product) return NotFoundProduct()

    const recommendedProducts = await ProductsQuery.getRecommendedProducts(client, product)

    return (
        <Container
            as="div"
            className="bg-white p-8 gap-10 flex flex-col">
            <main className="gap-8 w-full min-h-[55dvh] md:max-h-[55dvh]  flex-col md:flex-row flex">
                <ImageContainer image_url={product.image_url} name={product.name} />
                <ProductInfo {...product} />
            </main>
            {recommendedProducts.length > 0 && <ProductRecommendations products={recommendedProducts} />}
        </Container>
    )
}