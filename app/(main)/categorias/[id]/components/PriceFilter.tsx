"use client"
import { Input } from "@/components/ui/input";
import useDelay from "@/hooks/useDelay.hook";
import useForm from "@/hooks/useForm.hook";
import formatMoney from "@/utils/formatMoney.utilt";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PriceInputProps {
    placeholder: string
    value: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PriceInput = ({
    placeholder,
    value,
    name,
    onChange
}: PriceInputProps) => {
    return <Input
        type="number"
        className="h-[50px] rounded-sm border-default-600 hover:border-black placeholder:text-lg text-lg"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value} />
}

export default function PriceFilter() {

    const searchParams = useSearchParams()

    const router = useRouter()

    const [min, max] = [searchParams.get("price_min"), searchParams.get("price_max")]

    const { form, onChange, setForm } = useForm({
        price_min: min ? min.toString() : "",
        price_max: max ? max.toString() : "",
    })

    useEffect(() => {
        //Para cuando se elimina del search params
        if (!min && !max) {
            setForm({ price_min: "", price_max: "" })
        }
    }, [min, max])

    useDelay({
        values: [form.price_max, form.price_min],
        delay: 600,
        cb: () => {
            const minNumber = Number(form.price_min)
            const maxNumber = Number(form.price_max)
            if (form.price_max && minNumber > maxNumber) {
                /**
                 * Esto evalua para cuando el min es mayor al max y max tiene algun valor valido.,
                 * provocando un nuevo re-renderizado y revirtiendo los valores, antes de actualiza el searchParams.
                */
                setForm(prev => ({ ...prev, price_min: form.price_max, price_max: form.price_min }))
                return
            }

            const params = new URLSearchParams(searchParams.toString());
            for (const key in form) {
                const k = key as keyof typeof form
                if (!Number(form[k])) params.delete(k)
                else params.set(k, form[k])
            }
            router.push(`?${params.toString()}`)
        }
    })

    return (
        <div className="space-y-8">
            <h4 className=" text-[18px] text-default-800">Precio</h4>
            <div className="flex gap-2">
                <PriceInput
                    placeholder="Min"
                    name="price_min"
                    onChange={onChange}
                    value={form.price_min} />
                <PriceInput
                    placeholder="Max"
                    name="price_max"
                    onChange={onChange}
                    value={form.price_max} />
            </div>
        </div>
    )
}       