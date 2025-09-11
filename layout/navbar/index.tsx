"use client"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useEffect, useState } from "react"
import Categories from "./components/Categories"
import SearchProductModal from "./components/SearchProductModal"
import BurgerMenu from "./components/BurgerMenu"
import { DrawerTrigger, Drawer } from "@/components/ui/drawer"
import { LuMenu } from "react-icons/lu"


export default function Navbar() {

    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 120)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <Drawer direction="left">
            <NavigationMenu className="flex py-4 gap-2 flex-col max-w-full w-full  justify-center">
                <div className="flex items-center gap-2 px-3 w-full max-w-5xl justify-between">
                    <DrawerTrigger className="cursor-pointer">
                        <LuMenu className="md:hidden" size={32} strokeWidth={1} />
                    </DrawerTrigger>
                    <Image src="/logo.png" alt="Logo" width={200} height={200} />
                    <SearchProductModal />
                </div>
                <Categories />
            </NavigationMenu>
            <BurgerMenu />
        </Drawer>
    )
}