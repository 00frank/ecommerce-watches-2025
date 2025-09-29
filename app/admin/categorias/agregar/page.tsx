import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { Captions } from "lucide-react"

import { MainCategoriesSelectWithCheck } from "../components/MainCategoriesSelect"
import { SubmitButton } from "../components/SubmitButton"
import { createCategory } from "./actions"

export default async function AgregarProducto() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agregar Categoria</h1>
        <Button variant="outline">
          Volver
        </Button>
      </div>

      <form className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titulo*</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Titulo"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="slug">Identificador web*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">/</span>
                    <Input
                      id="slug"
                      name="slug"
                      type="text"
                      required
                      placeholder=""
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="is_active">Mostrar en la web</Label>
                  <Switch
                    id="is_active"
                    name="is_active"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <MainCategoriesSelectWithCheck />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Titulo para SEO</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Captions className="size-4" />
                </span>
                <Input
                  id="meta_title"
                  name="meta_title"
                  type="text"
                  placeholder=""
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Descripción</Label>
              <textarea
                id="meta_description"
                name="meta_description"
                rows={4}
                autoCorrect="off"
                autoCapitalize="off"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm resize-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <Button variant="outline" >
            Cancelar
          </Button>
          <SubmitButton formAction={createCategory} label="Guardar" loadingLabel="Guardando..." />
        </div>
      </form>
    </div>
  )
}