import { Product } from "@/types";
import Link from "next/link";


export default function ProductCard({
    color,
    name,
    image_url,
    id
}: Product) {
    return (
        <article
            className="h-[280px] max-h-[280px]  rounded-sm overflow-hidden border flex flex-col items-stretch border-default-200">
            <div className="flex-none">
                <img src={image_url} className="object-contain w-full h-40" alt="" />
            </div>
            <div className="p-0 flex-1 px-4 ">
                <h3 className="text-default-800 break-words line-clamp-3">{name}-{color}</h3>
            </div>
            <div className="py-8 flex items-center justify-center">
                <Link className="text-primary-900 underline " href={`/productos/${id}`}>Ver mas</Link>
            </div>
        </article>
    )
}