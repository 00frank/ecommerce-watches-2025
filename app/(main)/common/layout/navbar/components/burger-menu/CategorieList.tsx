"use client"
import { Category } from "@/types"
import isCategoryActive from "@/utils/isCategoryActive.util"
import clsx from "clsx"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { memo, useState } from "react"

interface CategoryItemProps {
    category: Category,
    isLinkActive: boolean,
    seeAllActive: boolean
}


interface CategoryLinkProps {
    slug: string,
    title: string,
    isLinkActive: boolean
}

const CategoryItem = memo(({ category, isLinkActive, seeAllActive }: CategoryItemProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)

    /**
     * Se renderizan recursivamente las subcategorias.
     */
    return (
        <li>
            <button
                className={clsx(
                    "flex group w-full hover:bg-gray-100 p-2 cursor-pointer items-center justify-between text-default-700",
                    isLinkActive && "bg-gray-100 text-default-950"
                )}
                onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-semibold truncate  text-md uppercase group-hover:text-default-950 transition-colors duration-200">
                    {category.title}
                </h3>
                <ArrowRight size={20} strokeWidth={1} />
            </button>
            {isOpen &&
                <div className="absolute space-y-2 py-2 top-0 left-0 w-full h-full bg-white">
                    <button
                        onClick={onClose}
                        className="flex items-center p-2 w-full gap-3 cursor-pointer uppercase">
                        <ArrowLeft size={20} strokeWidth={1} />
                        <h3 className="truncate">{category.title}</h3>
                    </button>
                    <CategoryLink
                        slug={category.slug || ""}
                        title={"Ver todo"}
                        isLinkActive={seeAllActive}
                    />
                    <CategoriesList
                        categories={category.subCategories}
                    />
                </div>
            }
        </li>
    )
})

const CategoryLink = ({ slug, title, isLinkActive }: CategoryLinkProps) => {
    return (
        <li className={clsx(
            "p-2 flex",
            isLinkActive && "bg-gray-100"
        )}>
            <Link
                className={clsx(
                    "hover:underline w-full underline-offset-2  text-default-700 text-semibold text-md uppercase hover:text-default-950 transition-colors duration-200  cursor-pointer",
                    isLinkActive && "underline !text-default-950 "
                )}
                href={`/categorias/${slug}`}>
                <p className="truncate text-start">{title}</p>
            </Link>
        </li>
    )
}



export default function CategoriesList({ categories }: { categories: Category[] }) {

    const { category_slug } = useParams()

    return (
        <ul className="space-y-1">
            {categories.map((cat) => {
                const isEqualSlug = cat.slug === category_slug
                return cat.subCategories.length > 0 ?
                    <CategoryItem
                        key={cat.id}
                        isLinkActive={isCategoryActive(cat, category_slug)}
                        seeAllActive={isEqualSlug}
                        category={cat} /> :
                    <CategoryLink
                        key={cat.id}
                        slug={cat.slug || ""}
                        title={cat.title || ""}
                        isLinkActive={isEqualSlug}
                    />
            })}
        </ul>
    )
}