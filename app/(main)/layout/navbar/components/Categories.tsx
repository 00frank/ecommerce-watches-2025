import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { createClient } from "@/utils/supabase/server";
import { buildCategoryTree } from "@/utils";

// export const revalidate = 1800

export default async function Categories() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('id', { ascending: true });
  if (!categories) return null;
  const categoriesTree = buildCategoryTree(categories)

  return (
    <div className="max-md:hidden">
      <NavigationMenuList className="py-2 max-w-4xl w-full  flex-wrap gap-2">
        {categoriesTree.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="text-default-950  text-semibold uppercase cursor-pointer font-normal hover:underline transition-colors duration-200">
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