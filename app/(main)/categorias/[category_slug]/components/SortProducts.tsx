"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
    { value: "alpha-desc", label: "Alfabeticamente, A-Z" },
    { value: "alpha-asc", label: "Alfabeticamente, Z-A" },
    { value: "date-desc", label: "Fecha, Antiguo a nuevo" },
    { value: "date-asc", label: "Fecha, nuevo a antiguo" },
]

export default function SortProducts() {

    const router = useRouter()

    const searchParams = useSearchParams()

    const searchSort_by = searchParams.get("sort_by")

    const sort_by = sortOptions.find(i => i.value === searchSort_by)?.value || ""

    return (
        <div className="flex items-center">
            <Select
                onValueChange={(value) => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set("sort_by", value)
                    router.push(`${window.location.pathname}?${params.toString()}`)
                }}
                value={sort_by}>
                <SelectTrigger className="rounded-none text-md !text-default-800 border-0 cursor-pointer border-b shadow-none">
                    <SelectValue id="asdasdasd" className="" placeholder="Ordernar por:" />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map(i =>
                        <SelectItem
                            className="text-[16px] text-default-800"
                            key={i.value}
                            value={i.value}>
                            {i.label}
                        </SelectItem>)}
                </SelectContent>
            </Select>
            {
                sort_by &&
                <button>
                    <X
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString())
                            params.delete("sort_by")
                            router.replace(`${window.location.pathname}?${params.toString()}`)
                        }}
                        cursor="pointer"
                        size={24}
                        strokeWidth={1} />
                </button>
            }
        </div>
    )
}