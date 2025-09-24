import { ProductDatabase } from "@/types/product.interface";
import Link from "next/link";


export default function ProductCard({
    color,
    name,
    image_url,
    sku
}: ProductDatabase) {
    return (
        <article
            className="h-[350px] max-h-[350px] p-2 rounded-sm overflow-hidden border flex flex-col items-stretch border-default-200">
            <div className="flex-none">
                <img
                    src={image_url || ""}
                    className="object-contain w-full h-40"
                    alt={sku || ""} />
            </div>
            <div className="p-0 flex-1 px-4 ">
                <h3 className="text-default-800 break-words line-clamp-3">{name}-{color}</h3>
            </div>
            <div className="py-8 flex items-center justify-center">
                <Link className="text-primary-900 underline " href={`/productos/${sku}`}>Ver mas</Link>
            </div>
        </article>
    )
}