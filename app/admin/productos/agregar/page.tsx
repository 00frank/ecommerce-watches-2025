import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ServerCategoriesSelect } from "../components/CategoriesSelect"
import { ImageProductInput } from "../components/ImageProductInput"
import { SubmitButton } from "../components/SubmitButton"
import { createProduct } from "./actions"

export default async function AgregarProducto() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agregar Producto</h1>
        <Button variant="outline">
          Volver
        </Button>
      </div>

      <form className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageProductInput />
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del producto*</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Nombre del producto"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    placeholder="Ej: REL-XYZ-001"
                  />
                </div>
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    name="brand"
                    placeholder="Ej: Casio, Rolex, etc."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/3">
                  <Label htmlFor="price">Precio*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="1"
                      required
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2 w-1/3">
                  <Label htmlFor="available">Stock</Label>
                  <Switch
                    name="available"
                    id="available"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/3">
                  <Label htmlFor="categoryId">Categoría*</Label>
                  <ServerCategoriesSelect />
                </div>
                <div className="space-y-2 w-1/3">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    name="color"
                    type="color"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <Button variant="outline" >
            Cancelar
          </Button>
          <SubmitButton formAction={createProduct} label="Guardar" loadingLabel="Guardando..." />
        </div>
      </form>
    </div>
  )
}