"use client"
import categories from "@/mocks/categories.mock"
import Category from "@/types/category.interface"
import { AnimatePresence, motion } from "framer-motion"
import { memo, useCallback, useState } from "react"
import { LuChevronDown } from "react-icons/lu"

interface CategoryItem {
  item: Category
  toggleCategory: (category: Category) => void
  isActive: boolean
}

const CategoryItem = memo(({
  item,
  toggleCategory,
  isActive,
}: CategoryItem) => {
  return (
    <motion.li
      whileHover="hovered"
      className="relative max-w-[250px] flex flex-col items-start"
    >
      <button
        className="px-3 text-black/70 py-2 text-sm uppercase cursor-pointer flex items-center gap-1 w-full"
        onClick={() =>
          item.subCategories.length > 0 ? toggleCategory(item) : null
        }
      >
        <span className="truncate overflow-hidden whitespace-nowrap flex-1">
          {item.name}
        </span>

        {item.subCategories.length > 0 && (
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-flex items-center flex-shrink-0"
          >
            <LuChevronDown />
          </motion.span>
        )}
      </button>

      <motion.div
        variants={{
          hovered: { width: "100%" },
        }}
        className="h-[1px] absolute bottom-2 left-0 bg-black/70 w-full"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </motion.li>
  )
})


export default function Categories() {

  const [activeCategory, setActiveCategory] = useState<Category | null>()

  const toggleCategory = useCallback((category: Category) => setActiveCategory(prev => prev?.id === category.id ? null : category), [])

  return (
    <>
      <ul
        className="py-4 justify-center gap-1 gap-x-2 w-full inline-flex flex-wrap">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            item={category}
            toggleCategory={toggleCategory}
            isActive={activeCategory?.id === category.id}
          />
        ))}
      </ul>
      <AnimatePresence>
        {activeCategory &&
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 border-t border-black/10  top-full  bg-white w-full text-black shadow-lg p-2">
            {activeCategory.subCategories.map((sub) => (
              <li
                key={sub.id}
                className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                {sub.name}
              </li>
            ))}
          </motion.ul>
        }
      </AnimatePresence>
    </>
  )
}