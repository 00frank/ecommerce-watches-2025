"use client"

import { useState } from "react"
import { resetPassword } from "../actions"
import { useFormStatus } from "react-dom"

export const PasswordInputs = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { pending } = useFormStatus();
  const [valid, setValid] = useState(false);
  const validate = () => {
    if (password !== confirmPassword) {
      setValid(false);

    }
    setValid(true);
  }

  return (
    <>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Nueva contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Ingresa tu nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Confirma tu nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <span className="text-red-500" id="passwordMatchMessage"
        style={{ display: valid ? 'block' : 'none' }}>
        Las contraseñas no coinciden
      </span>
      <div>
        <button
          type="submit"
          formAction={e => { validate(); resetPassword(e) }}
          disabled={pending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Cargando..." : "Establecer contraseña"}
        </button>
      </div>
    </>
  )
}