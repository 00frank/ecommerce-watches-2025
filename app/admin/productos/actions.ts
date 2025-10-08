"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
    const supabase = await createClient()
    const id = formData.get('id')

    const { error } = await supabase.from('products').delete().eq('id', Number(id))

    if (error) {
        throw error
    }

    revalidatePath('/admin/productos')
}