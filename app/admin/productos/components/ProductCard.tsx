import { Product } from "@/types"
import Link from "next/link"

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center p-3 justify-between">
      <div className="flex w-3/6 items-center gap-2">
        <img className="w-24 h-24 object-cover border rounded-lg" src={product.image_url} alt="" />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: product.color }} />
        <h2 className="font-semibold line-clamp-2 max-w-[330px]">
          {product.name}
        </h2>
      </div>
      <div className="flex flex-col w-2/6">
        <p className="text-sm">💵 Precio: <b>$ {product.price}</b></p>
        <p className="text-sm">📦 Stock: <b>{product.quantity > 0 ? "Si ✅" : "No ❌"}</b></p>
        <p className="text-sm line-clamp-2">🏷️ Categoría: <b>{product.category.description}</b></p>
      </div>
      <div className="flex justify-center flex-col gap-2 w-1/6">
        <Link href={`/admin/productos/${product.id}`} className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg">Editar</Link>
        <button className="bg-red-600 text-white text-center px-4 py-2 rounded-lg">Eliminar</button>
      </div>
    </div>
  )
}