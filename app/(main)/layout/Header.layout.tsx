import { createClient } from "@/lib/supabase/server"


export default async function Header() {
  const supabase = await createClient()
  const { data: configurations } = await supabase.from('configurations').select('*').single()

  return (
    <header className="w-full h-[var(--header-height)] z-[1000] bg-primary-800 flex items-center justify-center ">
      <p className="text-white text-sm">{configurations?.welcome_message}</p>
    </header>
  )
}