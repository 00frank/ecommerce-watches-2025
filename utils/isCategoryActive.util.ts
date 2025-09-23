import { Category } from "@/types"

export default function isCategoryActive(category: Category, slug: any) {

    if (category.slug === slug) return true

    const isActive = category.subCategories.some((subCat) => {
        const equalSlug = subCat.slug === slug
        if (equalSlug) return equalSlug
        return subCat.subCategories.length > 0 && isCategoryActive(subCat, slug)
    })
    return isActive
}