"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
  formAction: (formData: FormData) => void | Promise<void> | undefined;
  label: string;
  loadingLabel: string;
}

export function SubmitButton({ formAction, label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      formAction={formAction}
      disabled={pending}>
      {pending ? loadingLabel : label}
    </Button>
  )
}