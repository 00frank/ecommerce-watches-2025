"use client"
import useMedia from "@/hooks/useMedia.hook"
import { createContext, useContext, useState } from "react"
import { Drawer } from "@/components/ui/drawer"

const DrawerContext = createContext(false)

export const useDrawerContext = () => useContext(DrawerContext)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false)

    useMedia("(min-width: 768px)", () => setOpen(false))

    return (
        <DrawerContext.Provider value={open}>
            <Drawer
                direction="left"
                open={open}
                onOpenChange={setOpen}>
                {children}
            </Drawer>
        </DrawerContext.Provider>
    )
}