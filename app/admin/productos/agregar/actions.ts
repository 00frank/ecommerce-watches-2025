'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface ProductFormData {
  name: string
  price: string
  sku: string
  brand: string
  color: string
  quantity: number
  category_id: string
  image_url?: string
  is_active: boolean
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  const productData: ProductFormData = {
    name: formData.get('name') as string,
    price: formData.get('price') as string,
    sku: formData.get('sku') as string,
    brand: formData.get('brand') as string,
    color: formData.get('color') as string,
    quantity: Boolean(formData.get('available') as string) ? 1 : 0,
    category_id: formData.get('categoryId') as string,
    is_active: Boolean(formData.get('is_active') as string)
  }

  console.log("productData", productData);

  const imageFile = formData.get('image') as File | null

  try {
    // Upload image if exists

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`${fileName}`, imageFile)

      if (uploadError) throw uploadError
      
      // Get public URL
      const { data: { publicUrl } } = await supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path)
      
      productData.image_url = publicUrl
    }

    // Insert product
    const { data: product, error } = await supabase
      .from('products')
      .insert([
        productData
      ])
      .select()
      .single()

    if (error) throw error

    revalidatePath('/admin/productos')
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error(error instanceof Error ? error.message : 'Error al crear el producto')
  } finally {
    redirect('/admin/productos')
  }
}