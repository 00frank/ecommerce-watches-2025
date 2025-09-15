"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useForm from "@/hooks/useForm.hook";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import clsx from "clsx"
import { Search, X } from "lucide-react";

const SearchInput = () => {

    const { form, onChange } = useForm({ name: "" })
    const [isFocused, setIsFocused] = useState(false)

    const hasValue = form.name.length > 0

    return (
        <div className="relative max-w-3xl w-full">
            <label
                className={clsx("absolute left-3 transition-all duration-200 pointer-events-none",
                    isFocused || hasValue ? "-top-2 text-xs text-black bg-white px-1 translate-y-0" : "top-1/2 -translate-y-1/2 text-gray-400 text-base")}
            >
                Buscar producto
            </label>
            <Input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=" "
                className={clsx("w-full border rounded-md px-3 py-6 pr-10 transition-colors duration-200",
                    isFocused ? "border-black" : "border-gray-300", "focus:outline-none focus:ring-1 focus:ring-black-500")} />
            <Search
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
    )
}

const SearchProductModal = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer
            open={isOpen}
            onOpenChange={setIsOpen}
            direction="top">
            <DrawerTrigger
                className="hover:scale-105 cursor-pointer">
                <Search
                    size={24}
                    strokeWidth={1} />
            </DrawerTrigger>
            <DrawerContent className="py-20 z-[999000]">
                <div className="w-full justify-center px-6 gap-2 flex items-center">
                    <SearchInput />
                    <X
                        size={24}
                        strokeWidth={1}
                        className="cursor-pointer"
                        onClick={() => setIsOpen(false)}></X>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchProductModal