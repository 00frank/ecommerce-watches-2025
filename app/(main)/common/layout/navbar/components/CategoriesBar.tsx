"use client"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Category } from "@/types";
import isCategoryActive from "@/utils/isCategoryActive.util";
import clsx from "clsx";
import { useParams } from "next/navigation";

export default function CategoriesBar({ categories }: { categories: Array<Category> }) {

  const { category_slug } = useParams()

  return (
    <div className="max-md:hidden">
      <NavigationMenuList className="py-2 max-w-4xl w-full  flex-wrap gap-2">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className={clsx(
              "text-default-950 text-[15px]  text-semibold uppercase cursor-pointer font-normal hover:underline transition-colors duration-200",
              isCategoryActive(category, category_slug) && "font-bold underline"
            )}>
              {category.title}
            </NavigationMenuTrigger>
            {category.subCategories && (
              <NavigationMenuContent
              >
                <ul className="flex-1 w-full max-w-[1200px]">
                  {category.subCategories && category.subCategories.map((subCategory) => (
                    <NavigationMenuLink key={subCategory.id}>
                      {subCategory.title}
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </div>
  )
}