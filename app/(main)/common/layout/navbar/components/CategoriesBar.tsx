"use client"
import { NavigationMenuList } from "@/components/ui/navigation-menu";
import { Category } from "@/types";
import { Params } from "@/types/params.type";
import isCategoryActive from "@/utils/isCategoryActive.util";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";


interface ButtonOpenCategoryProps {
  category: Category,
  handleOpenCategory: (category: Category) => void
  category_slug?: string
  isSelected?: boolean
}

const classNameCategory = {
  default: "text-default-700 hover:text-default-950 text-[15px] p-2  items-center text-semibold bg-white flex uppercase cursor-pointer font-normal hover:underline transition-colors duration-200",
  active: "font-medium underline text-default-950",
}

const SubCategories = ({ category, category_slug }: { category: Category, category_slug?: string }) => {
  return (
    <ul className={
      clsx(
        "bg-white border-b grid p-10 border-black/10 mt-[1px]  w-full absolute left-0 top-full z-10",
        category.subCategories.length > 3 && "grid-cols-3 justify-items-center"
      )
    }>
      <li className="py-1">
        <Link
          href={`/categorias/${category.slug}`}
          className={clsx(
            classNameCategory.default,
            (category_slug === category.slug) && classNameCategory.active,
          )}
        >
          Ver Todo
        </Link>
      </li>
      {category.subCategories.map((category) => (
        <li key={category.id} className="py-1">
          <Link
            href={`/categorias/${category.slug}`}
            className={clsx(
              classNameCategory.default,
              isCategoryActive(category, category_slug) && classNameCategory.active,
            )}>
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}


const ButtonOpenCategory = memo(({
  category,
  handleOpenCategory,
  category_slug,
  isSelected
}: ButtonOpenCategoryProps) => {
  const isActive = isCategoryActive(category, category_slug)
  return (
    <button onClick={() => handleOpenCategory(category)} className={clsx(
      classNameCategory.default,
      (isSelected || isActive) && classNameCategory.active
    )}>
      {category.title}
      <ChevronDown
        strokeWidth={1}
        size={18}
        className={clsx(
          "transition-transform duration-100",
          isSelected && "rotate-180"
        )}
      />
    </button>
  )
})

const LinkCategory = memo(({
  category,
  category_slug,
}: {
  category: Category,
  category_slug?: string
}) => {
  const isActive = isCategoryActive(category, category_slug)
  return (
    <Link
      className={clsx(
        classNameCategory.default,
        (isActive) && classNameCategory.active
      )}
      href={`/categorias/${category.slug}`}>
      {category.title}
    </Link>
  )
})

export default function CategoriesBar({ categories }: { categories: Array<Category> }) {

  const { category_slug } = useParams<Params>()

  const [openCategory, setOpenCategory] = useState<Category | null>()

  const containerRef = useRef<HTMLDivElement>(null)

  const handleOpenCategory = (category: Category) => {
    setOpenCategory(prev => prev?.id === category.id ? null : category)
  }

  useEffect(() => {
    setOpenCategory(null)
  }, [category_slug])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenCategory(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="max-md:hidden">
      <NavigationMenuList className="py-2 max-w-4xl w-full  flex-wrap gap-2">
        {categories.map((category) => (
          <NavigationMenuItem>
            {
              category.subCategories.length > 0 ?
                <ButtonOpenCategory
                  key={category.id}
                  category={category}
                  handleOpenCategory={handleOpenCategory}
                  category_slug={category_slug}
                  isSelected={openCategory?.id == category.id}
                />
                :
                <LinkCategory
                  key={category.id}
                  category={category}
                  category_slug={category_slug}
                />
            }
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {openCategory && <SubCategories category={openCategory} category_slug={category_slug} />}
    </div>
  )
}