import { Product } from "@/types"

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center p-2 gap-4">
      <img className="w-24 h-24 object-cover border rounded-lg" src="https://m.media-amazon.com/images/I/61QmBa1HjML._AC_SL1019_.jpg" alt="" />
      <h2 className="font-semibold">{product.name}</h2>
      <div>
        <p className="text-sm">Stock: {product.quantity}</p>
        <p className="text-sm">Categoría: {product.category_id}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Editar</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Eliminar</button>
      </div>
    </div>
  )
}