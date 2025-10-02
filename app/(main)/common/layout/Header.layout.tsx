import ConfigurationsQuery from "@/lib/supabase/queries/configurations.query"
import { createClient } from "@/lib/supabase/server"

export default async function Header() {
    const { welcome_message } = await ConfigurationsQuery.getConfiguration(await createClient(), "welcome_message")

    return (
        <header className="w-full h-[var(--header-height)] z-[1000] bg-primary-800 flex items-center justify-center ">
            <p className="text-white text-[]">{welcome_message}</p>
        </header>
    )
}