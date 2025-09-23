import Container from "@/components/container"
import ProductCard from "@/components/productCard"
import productMock from "@/mocks/product.mock"
import { Product } from "@/types"
import clsx from "clsx"
import Image from "next/image"

const ImageContainer = ({ image_url, name }: { image_url: string, name: string }) => {
    return (
        <section className="flex-1 border-1 border-black/5 rounded-xs ">
            <Image
                src={image_url}
                alt={name}
                className="m-auto h-full w-full object-contain"
                width={1920}
                height={1080} />
        </section>
    )
}

interface ProductInfoProps extends Omit<Product, "image_url"> { }

const ProductInfo = ({
    brand,
    name,
    color,
    has_stock,

}: ProductInfoProps) => {
    return (
        <section className="flex-1 p-6 flex  gap-10 flex-col">
            <header>
                <h1 className="uppercase text-[12px] font-medium text-default-700">{brand}</h1>
                <h2 className="uppercase text-4xl font-bold">{name}</h2>
                <p className="text-4xl font-bold">{color}</p>
            </header>
            <p className={
                clsx(
                    !has_stock ? "line-through" : "",
                    "text-default-800"
                )}>
                Stock:
                <span className="font-semibold text-black"> {has_stock ? "Disponible" : "No disponible"}</span>
            </p>
            <button className="cursor-pointer hover:scale-95 duration-300 transition-all h-[60px] w-full md:w-[300px]">
                <a className="w-full h-full  rounded-xs bg-primary-800 text-white flex items-center justify-center" href="/carrito">
                    Comprar ahora
                </a>
            </button>
        </section>
    )
}

const list = [
    productMock,
    productMock,
    productMock,
    productMock,
    productMock,
].map((product, index) => ({ ...product, id: index }))

const ProductRecommendations = () => {
    return (
        <section className="flex-1 flex  gap-10 flex-col">
            <header>
                <h2 className="text-2xl font-medium ">Productos recomendados
                </h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-5   gap-2 sm:gap-4">
                {
                    list.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                }
            </div>
        </section>
    )
}

export default function ProductPage() {


    return (
        <Container
            as="div"
            className="p-8 my-10 gap-10 flex flex-col">
            <main className="gap-8 w-full min-h-[60dvh] md:max-h-[60dvh]  flex-col md:flex-row flex">
                <ImageContainer image_url={productMock.image_url} name={productMock.name} />
                <ProductInfo {...productMock} />
            </main>
            <ProductRecommendations />
        </Container>
    )
}