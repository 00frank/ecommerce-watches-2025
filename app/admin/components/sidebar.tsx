"use client";

import { NavMain } from "@/app/admin/components/nav-main";
import { NavSecondary } from "@/app/admin/components/nav-secondary";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  BookOpenText,
  Command,
  LifeBuoy,
  Send,
  Settings2,
  ShoppingBasket,
  Wallpaper,
} from "lucide-react";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      url: "/admin/productos",
      icon: ShoppingBasket,
      isActive: true,
      items: [
        {
          title: "Agregar",
          url: "/admin/productos/agregar",
        },
        // {
        //   title: "Carga masiva",
        //   url: "/admin/productos/carga-masiva",
        // },
        {
          title: "Historial",
          url: "/admin/productos/historial",
        }
      ],
    },
    {
      title: "Categorias",
      url: "/admin/categorias",
      icon: BookOpenText,
      isActive: true,
      items: [
        {
          title: "Agregar",
          url: "/admin/categorias/agregar",
        },
        {
          title: "Historial",
          url: "/admin/categorias/historial",
        }
      ],
    },
    {
      title: "Banners",
      url: "/admin/banners",
      icon: Wallpaper
    },
    {
      title: "Configuraciones",
      url: "/admin/configuraciones",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/configuraciones",
        },
        {
          title: "Whatsapp",
          url: "/admin/configuraciones#whatsapp",
        }
      ],
    },
  ],
  navSecondary: [
    {
      title: "Soporte",
      url: "https://web.whatsapp.com/send?phone=+5491122681302&text=Hola, necesito ayuda con ...",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "https://web.whatsapp.com/send?phone=+5491122681302&text=Hola quisiera dar un feedback de ...",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 gap-0.5 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Importadora La Unión</span>
                  <Badge variant="secondary" className="text-xs">Plan Pro</Badge>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
