import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import categories from "@/mocks/categories.mock"

export default function Categories() {

  return (
    <div className="max-md:hidden">
      <NavigationMenuList className="py-2 max-w-4xl w-full  flex-wrap gap-2">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="text-black/60 text-[16px] text-semibold uppercase cursor-pointer font-normal hover:underline transition-colors duration-200">
              {category.name}
            </NavigationMenuTrigger>
            {category.subCategories && (
              <NavigationMenuContent className=" ">
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
    </div>
  )
}