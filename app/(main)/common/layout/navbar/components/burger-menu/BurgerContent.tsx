"use client"
import { useLayoutEffect, useState } from "react"
import { DrawerContent } from "@/components/ui/drawer"
import { useDrawerContext } from "../../provider/Drawer.provider"

export default function BurgerContent({ children }: { children: React.ReactNode }) {

    const [y, setY] = useState(0)
    const open = useDrawerContext()

    useLayoutEffect(() => {
        if (!open) return
        const h = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
            10
        )
        const y = Math.min(window.scrollY, h)
        setY(y)
    }, [open])

    return (
        <DrawerContent
            className="overflow-y-auto px-0 overflow-hidden py-4"
            style={{
                top: `calc(var(--nav-height) + var(--header-height) - ${y}px)`,
            }}>
            {children}
        </DrawerContent>
    )
}