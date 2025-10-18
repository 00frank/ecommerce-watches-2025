"use client"
import { Input } from "@/components/ui/input"
import clsx from "clsx"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useProductSearchContext } from "../provider/ProductSearch.provider"

interface Props {
    onSearch?: () => void
}

export default function SearchProduct({ onSearch }: Props) {

    const searchParams = useSearchParams()

    const { search, setSearch } = useProductSearchContext()

    const router = useRouter()

    const [isFocused, setIsFocused] = useState(false)

    const hasValue = search.length > 0

    const handleSearch = (value: string = search) => {
        if (value === searchParams.get("query")) return //En caso de que el valor cambio, no se haga ningun cambio de URL (evita peticiones innecesarias)
        router.push(`/search/?query=${value}`)
        onSearch && onSearch()
    }

    return (
        <div className="relative max-w-3xl w-full">
            <label
                className={clsx("absolute left-3 transition-all duration-200 pointer-events-none",
                    isFocused || hasValue ? "-top-2 text-xs text-default-950 bg-white px-1 translate-y-0" : "top-1/2 -translate-y-1/2 text-gray-400 text-base")}
            >
                Buscar producto
            </label>
            <Input
                type="text"
                name="name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleSearch()
                    }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false)
                }}
                placeholder=" "
                className={clsx("w-full border rounded-md px-3 py-6 pr-10 transition-colors duration-200",
                    isFocused ? "border-black" : "border-gray-600", "focus:outline-none focus:ring-1 focus:ring-black-500")} />
            <div className={"absolute flex items-center gap-2 right-3 top-1/2 -translate-y-1/2 text-gray-600"}>
                {
                    hasValue && (
                        <X
                            size={24}
                            onClick={() => {
                                setSearch("")
                                handleSearch("")
                            }}
                            strokeWidth={1}
                            className="cursor-pointer hover:scale-105"
                        />
                    )
                }
                {hasValue && <div className="w-px h-5 bg-gray-300" />}
                <Search
                    size={24}
                    onClick={() => handleSearch()}
                    strokeWidth={1}
                    className="cursor-pointer hover:scale-105"
                />
            </div>
        </div>
    )
}