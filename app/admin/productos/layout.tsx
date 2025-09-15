import { Inter } from 'next/font/google';

import "../../globals.css";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/admin/header';
import { AppSidebar } from '@/components/admin/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Panel de Productos',
  description: 'Panel de productos de la tienda de relojes',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
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
      </body>
    </html>
  );
}
