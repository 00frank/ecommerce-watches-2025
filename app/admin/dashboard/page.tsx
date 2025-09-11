import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
  
  let { data: categories, error } = await supabase
  .from('categories')
  .select('*');
  console.log("categories", categories)

  if (error) {
    console.error(error)
    return <p>Error fetching categories</p>
  }

  return <div>
    {categories?.map((category) => (
      <p key={category.id}>{category.title}</p>
    ))}
  </div>
}