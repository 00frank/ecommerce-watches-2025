"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  Wallpaper,
  BookOpenText,
  Command,
  LifeBuoy,
  Send,
  Settings2,
  ShoppingBasket,
} from "lucide-react"
import { NavMain } from "@/app/admin/components/nav-main"
import { NavSecondary } from "@/app/admin/components/nav-secondary"
import { NavUser } from "@/app/admin/components/nav-user"
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
        {
          title: "Carga masiva",
          url: "/admin/productos/carga-masiva",
        },
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
      items: [
        {
          title: "Agregar",
          url: "/admin/categorias/agregar",
        },
        {
          title: "Listado",
          url: "/admin/categorias/listado",
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
      icon: Wallpaper,
      items: [
        {
          title: "Agregar",
          url: "/admin/banners/agregar",
        },
        {
          title: "Listado",
          url: "/admin/banners/listado",
        },
      ],
    },
    {
      title: "Configuraciones",
      url: "/admin/configuraciones",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/configuraciones/general",
        },
        {
          title: "Whatsapp",
          url: "/admin/configuraciones/whatsapp",
        }
      ],
    },
  ],
  navSecondary: [
    {
      title: "Soporte",
      url: "https://wa.me/5491122681302?text=Hola, necesito ayuda con ...",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "https://wa.me/5491122681302?text=Hola quisiera dar un feedback de ...",
      icon: Send,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
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
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Empresa de relojes</span>
                  <span className="truncate text-xs">Plan Pro CZ9</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
