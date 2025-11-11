"use client"

import { useAppConfigContext } from "@/app/(main)/common/provider/AppConfig.provider"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Props {
    product_id: number
    product_name: string
    category_title: string
}

export default function AskWhatsAppButton({ product_id, product_name, category_title }: Props) {
    const router = useRouter()
    const supabase = createClient()

    const {
        asking_message = "",
        phone_number = ""
    } = useAppConfigContext()

    const transformAskingMessage = asking_message?.replace("{{product}}", product_name).replace("{{category}}", category_title)

    const handleWhatsAppClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        
        try {
            // Update the product counter
            const { error } = await supabase.rpc('increment_product_counter', {
                productid: product_id
            })

            if (error) {
                console.error('Error updating product counter:', error)
            }
            
            // Open WhatsApp in a new tab
            window.open(`https://wa.me/${phone_number}?text=${transformAskingMessage}`, '_blank')
            
            // Refresh the page to show updated counter
            router.refresh()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <button 
            onClick={handleWhatsAppClick}
            className="cursor-pointer hover:scale-95 duration-200 transition-all h-[60px] w-full md:w-[300px]"
        >
            <a 
                className="w-full h-full rounded-sm hover:bg-primary-600 hover:text-white border border-primary-600 text-primary-600 px-6 py-2 flex items-center justify-center"
                href={`https://wa.me/${phone_number}?text=${transformAskingMessage}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Consultar precio
            </a>
        </button>
    )
}