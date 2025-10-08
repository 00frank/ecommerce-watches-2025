"use client"
import { useAppConfigContext } from "../provider/AppConfig.provider"

export default function Header() {

    const { welcome_message } = useAppConfigContext()

    if (!welcome_message) return null
    return (
        <header className="w-full h-[var(--header-height)] z-[1000] bg-primary-500 flex items-center justify-center ">
            <p className="text-white">{welcome_message}</p>
        </header>
    )
}