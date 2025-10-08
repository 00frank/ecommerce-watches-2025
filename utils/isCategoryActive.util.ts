import { Category } from "@/types"

export default function isCategoryActive(category: Category, slug: any) {

    if (category.slug === slug) return true

    const isActive = category.subCategories.some((subCat) => isCategoryActive(subCat, slug))
    return isActive
}