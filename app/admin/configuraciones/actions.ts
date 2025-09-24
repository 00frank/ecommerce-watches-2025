'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateConfigurations(formData: FormData) {
  const supabase = await createClient()

  const configurationsData = {
    welcome_message: formData.get('welcome_message') as string,
    asking_message: formData.get('asking_message') as string,
    phone_number: formData.get('phone_number') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    facebook: formData.get('facebook') as string,
    instagram: formData.get('instagram') as string,
  }

  const { error } = await supabase
    .from('configurations')
    .update(configurationsData)
    .eq('id', 1)

  if (error) {
    console.error('Error updating configurations:', error)
    throw error
  }

  revalidatePath('/admin/configuraciones')
}
