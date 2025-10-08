"use client"

import { useFormStatus } from "react-dom"
import { login } from "../actions"

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      formAction={login}
      disabled={pending}
      className="flex w-full justify-center rounded-md bg-indigo-500 text-white px-3 py-1.5 text-sm/6 font-semibold 
                 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Cargando..." : "Iniciar sesión"}
    </button>
  )
}
