'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.updateUser(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/admin/dashboard', 'layout')
  redirect('/admin/dashboard')
}