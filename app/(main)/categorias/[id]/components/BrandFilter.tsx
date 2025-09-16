"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const brandsMock = [
    {
        id: 1,
        name: "Brand 1",
        item_count: 50
    },
    {
        id: 2,
        name: "Brand 2",
        item_count: 30
    },
    {
        id: 3,
        name: "Brand 3",
        item_count: 20
    },
]

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
                className="h-5 w-5 !bg-white rounded-[4px] border-default-400 cursor-pointer transition-transform active:scale-95 !text-default-950" />
            <p className="text-[18px] text-default-800">{name} ({item_count})</p>
        </li>
    )
}

export default function BrandFilter() {
    const params = useSearchParams()
    const rotuer = useRouter()
    const brands = params.getAll("brand")

    const setBrand = (brand: string) => {
        const refparams = new URLSearchParams(params.toString())
        if (refparams.has("brand", brand)) {
            refparams.delete("brand", brand)
        } else {
            refparams.append("brand", brand)
        }
        rotuer.push(`?${refparams.toString()}`)
    }

    return (
        <div className="border-b pb-4">
            <h4 className=" text-[18px] text-default-800">Marcas</h4>
            <ul className="mt-6 space-y-2">
                {
                    brandsMock.map(brand =>
                        <Brand
                            key={brand.id}
                            {...brand}
                            is_checked={brands.includes(brand.name)}
                            setBrand={setBrand}
                        />
                    )
                }
            </ul>
        </div>
    )
}