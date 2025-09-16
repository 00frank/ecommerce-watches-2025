"use client"
import formatMoney from "@/utils/formatMoney.utilt"
import { X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const filterParams = ["price_min", "price_max", "brand"]

interface FilterChipProps {
    value: string
    type: string
    removeFilter: () => void
}
const FilterChip = ({ value, type, removeFilter }: FilterChipProps) => {
    return (
        <li>
            <button
                onClick={removeFilter}
                className="border active:scale-95 transition-transform flex hover:border-2 cursor-pointer hover:border-default-700 text-default-950 items-center gap-2 px-2 p-1 rounded-2xl">
                <p className="text-[18px] text-default-950"><span className="font-medium">{type}</span>: {value}</p>
                <X size={16} strokeWidth={1} />
            </button>
        </li>
    )
}

export default function ClearFilters() {

    const searchParams = useSearchParams()

    const router = useRouter()

    const priceMin = searchParams.get("price_min") || ""
    const priceMax = searchParams.get("price_max") || ""
    const brands = searchParams.getAll("brand")

    const hasAnyFilter = [priceMin, priceMax, ...brands].some(value => value)

    const clearFilters = () => {
        const refparams = new URLSearchParams(searchParams.toString())
        filterParams.forEach(param => refparams.delete(param))
        router.push(`?${refparams.toString()}`)
    }

    const removeFilter = (filters: Array<{ param: string, value: string }>) => {
        const refparams = new URLSearchParams(searchParams.toString())
        filters.forEach(({ param, value }) => refparams.delete(param, value))
        router.push(`?${refparams.toString()}`)
    }

    const [min, max] = [Number(priceMin), Number(priceMax)]
    const priceValue = !max ? `${formatMoney(min)} +` : `${formatMoney(min)} - ${formatMoney(max)}`

    return (
        <div className=" border-b space-y-4 pb-4">
            <div className="flex justify-between items-start">
                <h4 className=" text-[18px] text-default-800">Filtros:</h4>
                {
                    hasAnyFilter &&
                    <button
                        onClick={clearFilters}
                        className="text-[17px] text-default-950 hover:scale-95 transition-transform underline underline-offset-2 hover:underline-2 cursor-pointer">
                        Limpiar filtros
                    </button>

                }
            </div>
            <ul className="flex-wrap flex gap-2 w-full">
                {
                    (priceMin || priceMax) &&
                    <FilterChip
                        type={"Precio"}
                        value={priceValue}
                        removeFilter={() => {
                            removeFilter([{ param: "price_min", value: priceMin }, { param: "price_max", value: priceMax }])
                        }} />
                }
                {brands.map(value =>
                    <FilterChip
                        key={"brand" + value}
                        type={"Marca"}
                        value={value}
                        removeFilter={() => removeFilter([{ param: "brand", value }])} />)}

            </ul>
        </div>
    )
}