'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface CategoryFormData {
  title: string
  slug: string
  description?: string
  parent_id?: string
  is_active: boolean
  meta_title: string
  meta_description: string
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const isSubcategory = formData.get('is_subcategory') === 'on';

  const categoryData: CategoryFormData = {
    title: (formData.get('title') as string).trim(),
    slug: (formData.get('slug') as string).trim(),
    is_active: formData.get('is_active') === 'on',
    description: (formData.get('title') as string).trim(),
    meta_title: (formData.get('meta_title') as string).trim(),
    meta_description: (formData.get('meta_description') as string).trim(),
  }

  if (isSubcategory) {
    const categoryId = formData.get('category_id') as string;
    categoryData.parent_id = categoryId;
    const { data: parentCategory } = await supabase.from('categories').select('*').eq('id', categoryId).single()
    categoryData.description = `${parentCategory.description} - ${categoryData.title}`;
  }

  try {
    const { error } = await supabase.from('categories').insert([categoryData])
    if (error) throw error
    revalidatePath('/admin/categorias')
  } catch (error) {
    console.error('Error creating category:', error)
    throw new Error(error instanceof Error ? error.message : 'Error al crear la categoría')
  } finally {
    redirect('/admin/categorias')
  }
}