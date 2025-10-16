import "../../globals.css";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/app/admin/components/header';
import { AppSidebar } from '@/app/admin/components/sidebar';

export const metadata = {
  title: 'Panel de Dashboard',
  description: 'Panel de dashboard de la tienda de relojes',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
