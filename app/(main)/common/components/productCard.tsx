import { ProductDatabase } from "@/types/product.interface";
import Link from "next/link";


export default function ProductCard({
    name,
    image_url,
    sku,
    brand
}: ProductDatabase) {
    return (
        <Link href={`/productos/${sku}`} className="block">
            <article
                className="h-[340px] max-h-[340px] cursor-pointer group hover:shadow-lg hover:border-default-300 p-3 rounded-md overflow-hidden border flex flex-col items-stretch border-default-200 transition-shadow duration-300"
            >
                <div className="flex-none overflow-hidden rounded-md">
                    <img
                        src={image_url || ""}
                        className="object-contain rounded-md w-full h-40 transition-transform duration-300 ease-in-out group-hover:scale-110"
                        alt={sku || ""}
                    />
                </div>
                <div className="flex-1  pt-2 text-center ">
                    <p className="text-[12px] font-semibold tracking-wide text-default-500 uppercase">
                        {brand}
                    </p>
                    <h3 className="text-default-800 uppercase text-[14px] font-medium mt-1 group-hover:underline underline-offset-2 break-words line-clamp-3">
                        {name}
                    </h3>
                </div>
                <div className="py-3 flex justify-center">
                    <span className="font-medium text-sm transition-all duration-200 ease-in-out group-hover:bg-primary-700 group-hover:text-white text-primary-700 border border-primary-700 px-6 py-2 rounded-sm">
                        Ver más
                    </span>
                </div>
            </article>
        </Link>


    )
}