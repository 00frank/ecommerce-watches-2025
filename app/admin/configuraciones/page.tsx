import { createClient } from '@/utils/supabase/server'
import { updateConfigurations } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Mail, MapPin, MessageSquareHeart, MessageSquareText, Phone } from 'lucide-react'
import { SaveConfigurationButton } from './components/SaveConfigurationButton'

export default async function Configuraciones() {
  const supabase = await createClient()

  const { data: configurations, error } = await supabase
    .from('configurations')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching configurations:', error)
    return <div>Error al cargar la configuración.</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" id="general">Configuraciones</h1>
      <div className="flex gap-6">
        <form className="space-y-4 w-3/4">
          <div className="grid w-full gap-3">
            <Label htmlFor="welcome_message">
              <MessageSquareHeart className="size-4" />
              Mensaje de bienvenida
            </Label>
            <Textarea
              id="welcome_message"
              name="welcome_message"
              defaultValue={configurations.welcome_message}
            />
            <p className="text-muted-foreground text-sm">
              Mensaje que se mostrará en la página de bienvenida.
            </p>
          </div>
          <Separator />
          <div className="grid w-full gap-3">
            <Label htmlFor="asking_message">
              <MessageSquareText className="size-4" />
              Mensaje de consulta de producto
            </Label>
            <Textarea
              id="asking_message"
              name="asking_message"
              defaultValue={configurations.asking_message}
            />
            <p className="text-muted-foreground text-sm">
              Mensaje que se mostrará cuando el usuario haga click en contactar y redireccione a WhatsApp.
            </p>
          </div>
          <Separator />
          <div className="grid w-full gap-3" id="whatsapp">
            <Label htmlFor="phone_number">
              <Phone className="size-4" />
              Número de teléfono (WhatsApp)
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              defaultValue={configurations.phone_number}
            />
          </div>
          <Separator />
          <div className="grid w-full gap-3">
            <Label htmlFor="email">
              <Mail className="size-4" />
              Email
            </Label>
            <Input id="email" name="email" defaultValue={configurations.email} />
          </div>
          <Separator />
          <div className="grid w-full gap-3">
            <Label htmlFor="address">
              <MapPin className="size-4" />
              Dirección
            </Label>
            <Input id="address" name="address" defaultValue={configurations.address} />
          </div>
          <Separator />
          <div className="grid w-full gap-3">
            <Label htmlFor="facebook">
              <Facebook className="size-4" />
              Facebook URL
            </Label>
            <Input id="facebook" name="facebook" defaultValue={configurations.facebook} />
          </div>
          <Separator />
          <div className="grid w-full gap-3">
            <Label htmlFor="instagram">
              <Instagram className="size-4" />
              Instagram URL
            </Label>
            <Input id="instagram" name="instagram" defaultValue={configurations.instagram} />
          </div>
          <SaveConfigurationButton />
        </form>
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-2">Palabras clave</h2>
          <Separator />
          <div className="my-4">
            <p className="font-semibold text-sm">{"{{product}}"}</p>
            <p className="text-muted-foreground text-sm">Hace referencia al producto que se va a recibir cuando se haga una consulta.</p>
          </div>
          <Separator />
          <div className="my-4">
            <p className="font-semibold text-sm">{"{{category}}"}</p>
            <p className="text-muted-foreground text-sm">Hace referencia a la categoría que se va a recibir cuando se haga una consulta.</p>
          </div>
        </div>
      </div>
    </div>
  )
}