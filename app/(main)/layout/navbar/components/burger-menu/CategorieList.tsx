"use client"
import { Category } from "@/types"
import isCategoryActive from "@/utils/isCategoryActive.util"
import clsx from "clsx"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { memo, useState } from "react"

const CategoryItem = memo(({ category, isLinkActive, seeAllActive }: { category: Category } & { isLinkActive: boolean, seeAllActive: boolean }) => {

    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)

    /**
     * Se renderizan recursivamente las subcategorias.
     */
    return (
        <li>
            <button
                className={clsx(
                    "flex group w-full hover:bg-gray-100 p-1 px-2  cursor-pointer items-center justify-between ",
                    isLinkActive && "bg-gray-100"
                )}
                onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-default-950  text-semibold  text-md uppercase group-hover:text-black transition-colors duration-200">
                    {category.title}
                </h3>
                <ArrowRight size={20} strokeWidth={1} />
            </button>
            {isOpen &&
                <div className="absolute space-y-2 py-2 top-0 left-0 w-full h-full bg-white">
                    <button
                        onClick={onClose}
                        className="flex items-center px-2  w-full gap-3 cursor-pointer py-1 uppercase">
                        <ArrowLeft size={20} strokeWidth={1} />
                        <h3>{category.title}</h3>
                    </button>
                    <CategoryLink
                        slug={category.slug}
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

const CategoryLink = ({ slug, title, isLinkActive }: Pick<Category, 'slug' | 'title'> & { isLinkActive: boolean }) => {
    return (
        <li className={clsx(
            "p-1 px-2 flex",
            isLinkActive && "bg-gray-100"
        )}>
            <Link
                className={clsx(
                    "hover:underline w-full  text-default-900 text-semibold text-md uppercase hover:text-black transition-colors duration-200  cursor-pointer",
                    isLinkActive && "underline !text-black "
                )}
                href={`/categorias/${slug}`}>{title}</Link>
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
                        slug={cat.slug}
                        title={cat.title}
                        isLinkActive={isEqualSlug}
                    />
            })}
        </ul>
    )
}