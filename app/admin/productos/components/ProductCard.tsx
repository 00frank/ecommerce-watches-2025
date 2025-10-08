import Image from "next/image"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { deleteProduct } from "../actions"
import { Product } from "@/types"

export async function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex items-center p-3 justify-between">
      <div className="flex w-3/6 items-center gap-2">
        <img className="w-24 h-24 object-cover border rounded-lg" src={product.image_url || ""} alt="" />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: product.color || "" }} />
        <h2 className="font-semibold line-clamp-2 max-w-[330px]">
          {product.name}
        </h2>
      </div>
      <div className="flex flex-col w-2/6">
        <p className="text-sm">📦 Stock: <b>{product.quantity && product?.quantity > 0 ? "Si ✅" : "No ❌"}</b></p>
        <p className="text-sm line-clamp-2">🏷️ Categoría: <b>{product.category.description}</b></p>
        <p className="text-sm">📦 Stock: <b>{product.quantity && product.quantity > 0 ? "Si ✅" : "No ❌"}</b></p>
      </div>
      <div className="flex justify-center flex-col gap-2 w-1/6">
        <Link href={`/admin/productos/${product.id}`} className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg">Editar</Link>
        <AlertDialog>
          <AlertDialogTrigger className="bg-red-600 text-white text-center px-4 py-2 rounded-lg cursor-pointer">Eliminar</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <div className="flex justify-around items-center gap-2">
                <div className="relative h-24 w-24">
                  <Image className="object-cover border rounded-lg" fill src={product.image_url || ""} alt={product.name || ""} />
                </div>
                <AlertDialogDescription className="w-2/3">
                  Esta acción no puede ser deshecha. Esta acción eliminará el producto <b>{product.name}</b> de la base de datos.
                </AlertDialogDescription>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
              <form>
                <input type="hidden" name="id" value={product.id} />
                <AlertDialogAction type="submit" formAction={deleteProduct} className="cursor-pointer">Eliminar</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}