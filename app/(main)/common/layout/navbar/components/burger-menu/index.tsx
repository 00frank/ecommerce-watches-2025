import { Category } from "@/types"
import BurgerContent from "./BurgerContent"
import CategoriesList from "./CategorieList"

export default function BurgerMenu({ categories }: { categories: Array<Category> }) {

    return (
        <BurgerContent>
            <CategoriesList categories={categories} />
        </BurgerContent>
    )
}