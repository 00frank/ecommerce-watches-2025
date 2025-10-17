"use client"
import WhatsAppSvg from "@/components/svg/whastapp.svg";
import { usePathname } from "next/navigation";
import { useAppConfigContext } from "../provider/AppConfig.provider";

export default function WhatsAppFloat() {

    const { phone_number } = useAppConfigContext()

    const router = usePathname()

    const isProductPage = router.includes("productos")

    if (!phone_number || isProductPage) return null

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <a
                href={`https://wa.me/${phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:scale-110 transition-transform duration-200"
            >
                <WhatsAppSvg className="w-8 h-8 text-white" />
            </a>
        </div>
    );
}   