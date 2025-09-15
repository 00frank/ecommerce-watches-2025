import { AppSidebar } from '@/components/admin/sidebar';
import { SiteHeader } from '@/components/admin/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  let { data: categories, error } = await supabase
    .from('categories')
    .select('*');
  console.log("categories", categories)

  if (error) {
    console.error(error)
    return <p>Error fetching categories</p>
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
}