"use client"
import { Checkbox } from "@/components/ui/checkbox"
import clsx from "clsx"
import { X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface BrandProps {
    name: string,
    item_count: number,
    is_checked: boolean,
    setBrand: (brand: string) => void
}
const Brand = ({
    name,
    item_count,
    is_checked,
    setBrand
}: BrandProps) => {
    return (
        <li className="flex items-center gap-3" onClick={() => setBrand(name)}>
            <Checkbox
                checked={is_checked}
                color="#000"
                className="h-5 w-5 border-default-500 hover:border-primary-700  data-[state=checked]:bg-primary-700 rounded-[4px] data-[state=checked]:border-primary-600 cursor-pointer transition-transform active:scale-95 !text-white" />
            <p className="text-default-800">
                {name}
                <span className={clsx(is_checked && "text-primary-600")}> ({item_count})
                </span>
            </p>
        </li>
    )
}

export default function BrandFilter({
    brands
}: {
    brands: Array<{ brand: string, product_count: number }>
}) {
    const params = useSearchParams()
    const rotuer = useRouter()
    const brandsParams = params.getAll("brand")

    const setBrand = (brand: string) => {
        const refparams = new URLSearchParams(params)
        if (refparams.has("brand", brand)) {
            refparams.delete("brand", brand)
        } else {
            refparams.append("brand", brand)
        }
        refparams.delete("page")
        rotuer.push(`?${refparams}`)
    }

    const resetBrands = () => {
        const refparams = new URLSearchParams(params)
        refparams.delete("brand")
        refparams.delete("page")
        rotuer.push(`?${refparams}`)
    }

    return (
        <div className="border-b w-full  pb-4">
            <div className="flex justify-between items-center">
                <h4 className=" text-[18px] text-default-800">Marcas</h4>
                {brandsParams.length > 0 &&
                    <X size={24} className="cursor-pointer" strokeWidth={1} onClick={resetBrands} />
                }
            </div>
            <ul className="mt-6 flex w-full flex-wrap md:flex-col  gap-4">
                {
                    brands.map(({ brand, product_count }) =>
                        <Brand
                            key={brand}
                            name={brand}
                            item_count={product_count}
                            is_checked={brandsParams.includes(brand)}
                            setBrand={setBrand}
                        />
                    )
                }
            </ul>
        </div>
    )
}