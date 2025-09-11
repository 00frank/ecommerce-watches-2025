"use client"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react"
import categories from "@/mocks/categories.mock"


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
        <NavigationMenu className=" flex max-w-full w-full  justify-center">
            <NavigationMenuList className=" py-2 max-w-5xl w-full  flex-wrap gap-2">
                {categories.map((category) => (
                    <NavigationMenuItem key={category.id}>
                        <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                        {category.subCategories.length > 0 && (
                            <NavigationMenuContent className="w-full shadow-none overflow-hidden">
                                <ul className="w-screen">
                                    {category.subCategories.map((subCategory) => (
                                        <NavigationMenuLink key={subCategory.id}>
                                            {subCategory.name}
                                        </NavigationMenuLink>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}