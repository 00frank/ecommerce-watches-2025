"use client"
import { DrawerContent } from "@/components/ui/drawer"
import categories from "@/mocks/categories.mock"
import Category from "@/types/category.interface"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { memo, useLayoutEffect, useMemo, useState } from "react"
import { useDrawerContext } from "../provider/Drawer.provider"
import { on } from "events"

const CategoryItem = memo(({ category }: { category: Category }) => {

    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)

    /**
     * Se renderizan recursivamente las subcategorias.
     */
    return (
        <li>
            <button
                className="flex group w-full hover:bg-gray-100 p-1 px-2 rounded-md cursor-pointer items-center justify-between "
                onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-black/70 group-hover:underline  text-semibold  text-[18px] uppercase group-hover:text-black transition-colors duration-200">
                    {category.name}
                </h3>
                <ArrowRight size={20} strokeWidth={1} />
            </button>
            {isOpen &&
                <div className="absolute space-y-2 p-4 top-0 left-0 w-full h-full bg-white">
                    <button
                        onClick={onClose}
                        className="flex items-center  w-full gap-3 cursor-pointer py-1 uppercase">
                        <ArrowLeft size={20} strokeWidth={1} />
                        <h3>{category.name}</h3>
                    </button>
                    <Categories
                        categories={category.subCategories}
                    />
                </div>
            }
        </li>
    )
})

export const Categories = ({ categories }: { categories: Category[] }) => {

    return (
        <ul className="space-y-1">
            {categories.map((cat) =>
                cat.subCategories.length > 0 ?
                    <CategoryItem
                        key={cat.id}
                        category={cat} /> :
                    <li key={cat.id}>
                        <Link
                            className="hover:underline text-black/70  text-semibold p-1 px-2 text-[18px] uppercase hover:text-black transition-colors duration-200  cursor-pointer"
                            href={`/categoria/${cat.id}`}>{cat.name}</Link>
                    </li>
            )}
        </ul>
    )
}

const BurgerContent = ({ children }: { children: React.ReactNode }) => {


    const [y, setY] = useState(0)
    const open = useDrawerContext() //Solo mantemos para que cause renderizados.

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
            className="overflow-y-auto overflow-hidden p-4"
            style={{
                top: `calc(var(--nav-height) + var(--header-height) - ${y}px)`,
            }}>
            {children}
        </DrawerContent>
    )
}

export default function BurgerMenu() {

    return (
        <BurgerContent>
            <Categories categories={categories} />
        </BurgerContent>
    )
}