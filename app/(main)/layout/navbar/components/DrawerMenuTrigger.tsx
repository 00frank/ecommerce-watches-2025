"use client"
import { DrawerTrigger } from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import { useDrawerContext } from "../provider/Drawer.provider";

export default function DrawerMenuTrigger() {
    const open = useDrawerContext()
    return (
        <DrawerTrigger className="cursor-pointer hover:scale-105">
            {
                open ?
                    <X className="md:hidden" size={32} strokeWidth={1} /> :
                    <Menu className="md:hidden" size={32} strokeWidth={1} />
            }
        </DrawerTrigger>
    )
}