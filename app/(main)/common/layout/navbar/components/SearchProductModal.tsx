"use client";
import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay, DrawerHeader } from "@/components/ui/drawer";
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

            <DrawerContent className="z-[999000] py-18" classNameOverlay="z-[999000]">
                <DrawerHeader className="flex absolute top-0 right-0 px-6 py-6 items-end">
                    <X
                        size={24}
                        strokeWidth={1}
                        className="cursor-pointer hover:scale-95 transition-all duration-300"
                        onClick={() => setIsOpen(false)}></X>
                </DrawerHeader>
                <div className="w-full justify-center  px-6 gap-2 flex items-center">
                    <SearchProduct onSearch={() => setIsOpen(false)} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchProductModal