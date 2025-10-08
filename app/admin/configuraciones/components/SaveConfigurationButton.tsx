"use client"

import { useFormStatus } from "react-dom"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { updateConfigurations } from "../actions"

export function SaveConfigurationButton() {
  const { pending } = useFormStatus();
  const sendAction = async (formData: FormData) => {
    await updateConfigurations(formData);
    toast.success('Configuraciones guardadas correctamente')
  }

  return (
    <Button formAction={sendAction} type="submit" disabled={pending}>
      {pending ? "Guardando..." : "Guardar Cambios"}
    </Button>
  )
}