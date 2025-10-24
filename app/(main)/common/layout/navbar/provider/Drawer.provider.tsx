"use client"
import useMedia from "@/hooks/useMedia.hook"
import { createContext, useCallback, useContext, useState } from "react"
import { Drawer } from "@/components/ui/drawer"

const DrawerContext = createContext({
    open: false,
    setOpen: (open: boolean) => { }
})

export const useDrawerContext = () => useContext(DrawerContext)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false)

    useMedia({
        query: "(min-width: 768px)",
        onMediaChange: () => setOpen(false)
    })

    const openHandler = useCallback((b: boolean) => {
        setOpen(b)
    }, [])

    return (
        <DrawerContext.Provider value={{
            open,
            setOpen: openHandler
        }}>
            <Drawer
                direction="left"
                open={open}
                onOpenChange={setOpen}>
                {children}
            </Drawer>
        </DrawerContext.Provider>
    )
}