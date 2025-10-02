import Link from "next/link";
import WhatsAppSvg from "@/components/svg/whastapp.svg";
import ConfigurationsQuery from "@/lib/supabase/queries/configurations.query"
import { createClient } from "@/lib/supabase/server"

export default async function WhatsAppFloat() {

    const { phone_number } = await ConfigurationsQuery.getConfiguration(await createClient(), "phone_number")

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link
                href={`https://wa.me/${phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:scale-110 transition-transform duration-200"
            >
                <WhatsAppSvg className="w-8 h-8 text-white" />
            </Link>
        </div>
    );
}   