"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import useMedia from "@/hooks/useMedia.hook"
import { Settings2 } from "lucide-react"

export default function FiltersDrawer() {

    const isMobile = useMedia({ query: "(max-width: 768px)" })
    return isMobile && (
        <Drawer direction="right">
            <DrawerTrigger className="flex cursor-pointer items-center gap-2 ">
                <Settings2 strokeWidth={1} size={22} />
                <span className="text-default-800 font-medium">Filtros</span>
            </DrawerTrigger>
            <DrawerContent className="z-[1000]">
                <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}