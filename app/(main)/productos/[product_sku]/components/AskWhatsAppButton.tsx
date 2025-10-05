"use client"

import { useAppConfigContext } from "@/app/(main)/common/provider/AppConfig.provider"

interface Props {
    product_name: string
    category_title: string
}

export default function AskWhatsAppButton({ product_name, category_title }: Props) {

    const {
        asking_message = "",
        phone_number = ""
    } = useAppConfigContext()

    const transformAskingMessage = asking_message?.replace("{{product}}", product_name).replace("{{category}}", category_title)

    return (
        <button className="cursor-pointer hover:scale-95 duration-200 transition-all h-[60px] w-full md:w-[300px]">
            <a className="w-full h-full  rounded-sm hover:bg-primary-700 hover:text-white border border-primary-700 text-primary-700 px-6 py-2 flex items-center justify-center"
                href={`https://web.whatsapp.com/send?phone=${phone_number}&text=${transformAskingMessage}`}
            >
                Consultar precio
            </a>
        </button>
    )
}