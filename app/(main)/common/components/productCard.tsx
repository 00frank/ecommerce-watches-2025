import { ProductDatabase } from "@/types/product.interface";
import Link from "next/link";


export default function ProductCard({
    name,
    image_url,
    sku
}: ProductDatabase) {
    return (
        <article
            className="h-[350px] max-h-[350px] hover:shadow-lg hover:border-default-300 p-2 rounded-sm overflow-hidden border flex flex-col items-stretch border-default-200">
            <div className="flex-none overflow-hidden">
                <img
                    src={image_url || ""}
                    className="object-contain rounded-lg w-full h-40"
                    alt={sku || ""} />
            </div>
            <div className="py-3 flex-1 px-4 ">
                <h3 className="text-default-800 break-words line-clamp-3">{name}</h3>
            </div>
            <div className="py-4 flex justify-center">
                <Link className="font-bold transition-all duration-300 ease-in-out hover:scale-95 text-white bg-primary-700 px-6 p-2 rounded-sm" href={`/productos/${sku}`}>Ver mas</Link>
            </div>
        </article>
    )
}