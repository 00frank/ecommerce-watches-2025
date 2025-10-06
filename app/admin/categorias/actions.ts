"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCategory(formData: FormData) {
    const supabase = await createClient()
    const id = formData.get('id')

    // borrar subcategorias relacionadas a este id
    const { error } = await supabase.from('categories').delete().eq('parent_id', id)

    if (error) {
        throw error
    }

    // borrar la categoria
    const { error: error2 } = await supabase.from('categories').delete().eq('id', id)

    if (error2) {
        throw error2
    }

    revalidatePath('/admin/categorias')
}