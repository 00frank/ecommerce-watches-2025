import { useState } from "react";

export default function useForm<T>(initialState: T) {
    const [form, setForm] = useState<T>(initialState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return {
        form,
        onChange
    }
}