import { NavigationMenu } from "@/components/ui/navigation-menu"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import BurgerMenu from "./components/burger-menu"
import DrawerMenuTrigger from "./components/DrawerMenuTrigger"
import SearchProductModal from "./components/SearchProductModal"
import DrawerProvider from "./provider/Drawer.provider"
import Container from "@/components/container"
import CategoriesQuery from "@/lib/supabase/queries/categories.query"
import { createClient } from "@/utils/supabase/server"
import CategoriesBar from "./components/CategoriesBar"


export default async function Navbar() {

    const categories = await CategoriesQuery.getAllCategories(await createClient())

    return (
        <DrawerProvider >
            <NavigationMenu className={clsx(
                "flex gap-2 flex-col max-h-min p-0 max-w-full",
                "w-full sticky border-b border-black/10 top-0 left-0 z-[1000] bg-white justify-center",
            )}>
                <Container className="flex h-[var(--nav-height)] items-center gap-2 justify-between">
                    <DrawerMenuTrigger />
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={200}
                            height={200}
                        />
                    </Link>
                    <SearchProductModal />
                </Container>
                <CategoriesBar categories={categories} />
            </NavigationMenu>
            <BurgerMenu categories={categories} />
        </DrawerProvider >
    )
}