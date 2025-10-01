"use client";
import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay } from "@/components/ui/drawer";
import { useState } from "react";
import { Search, X } from "lucide-react";
import SearchProduct from "@/app/(main)/common/components/SearchProduct";

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
            <DrawerContent className="py-20 z-[999000]" classNameOverlay="z-[999000]">
                <div className="w-full justify-center px-6 gap-2 flex items-center">
                    <SearchProduct onSearch={() => setIsOpen(false)} />
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