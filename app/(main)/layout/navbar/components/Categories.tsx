import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import categories from "@/mocks/categories.mock"

export default function Categories() {

  return (
    <div className="max-md:hidden">
      <NavigationMenuList className="py-2 max-w-4xl w-full  flex-wrap gap-2">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="text-default-950  text-semibold uppercase cursor-pointer font-normal hover:underline transition-colors duration-200">
              {category.title}
            </NavigationMenuTrigger>
            {category.subCategories && (
              <NavigationMenuContent
              >
                <ul className="flex-1 w-full max-w-[1200px]">
                  {category.subCategories.map((subCategory) => (
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