"use client"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import categories from "@/mocks/categories.mock"

export default function Categories() {

  return (
    <NavigationMenuList className=" py-2 max-md:hidden max-w-4xl w-full  flex-wrap gap-2">
      {categories.map((category) => (
        <NavigationMenuItem key={category.id}>
          <NavigationMenuTrigger className="text-black/70 uppercase">{category.name}</NavigationMenuTrigger>
          {category.subCategories.length > 0 && (
            <NavigationMenuContent className="">
              <ul className="flex-shrink-0 w-full">
                {category.subCategories.map((subCategory) => (
                  <NavigationMenuLink key={subCategory.id}>
                    {subCategory.name}
                  </NavigationMenuLink>
                ))}
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  )
}