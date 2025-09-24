"use client"
import { Category } from "@/types"
import isCategoryActive from "@/utils/isCategoryActive.util"
import clsx from "clsx"
import { useParams } from "next/navigation"
import LinkItem from "./LinkItem"

export default function CategoriesList({ categories }: { categories: Array<Category> }) {

    const { category_slug } = useParams()

    return (
        <section className="space-y-4">
            <h4 className="text-xl">Menú</h4>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <LinkItem
                        key={category.id}
                        className={clsx(
                            "uppercase",
                            isCategoryActive(category, category_slug) && "font-bold underline"
                        )}
                        name={category.title}
                        href={`/categorias/${category.slug}`} />
                ))}
            </ul>
        </section>
    )
}