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
import { deleteCategory } from "../actions"
import { CategoryTree } from "@/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export async function CategoryCard({ category }: { category: CategoryTree }) {
  return (
    <div className="flex items-center p-3 justify-between border-t">
      <div className="flex w-2/6 items-center gap-2">
        <h2 className="font-semibold line-clamp-2 max-w-[330px]">
          🏷️ {category.title}:
        </h2>
      </div>
      <div className="flex flex-col w-3/6 pr-4">
        {!category.subCategories && (
          <p className="text-gray-500 text-center">(Sin subcategorias)</p>
        )}
        {category.subCategories && (
          <DropdownMenu>
            <DropdownMenuTrigger>Mostrar subcategorias</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{category.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {category.subCategories.map((subCategory) => (
                <Link href={`/admin/categorias/${subCategory.id}`} key={subCategory.id}>
                  <DropdownMenuItem className="cursor-pointer">
                    {subCategory.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex justify-center flex-col gap-2 w-1/6">
        <Link href={`/admin/categorias/${category.id}`} className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg">Editar</Link>
        <AlertDialog>
          <AlertDialogTrigger className="bg-red-600 text-white text-center px-4 py-2 rounded-lg cursor-pointer">Eliminar</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no puede ser deshecha. Esta acción eliminará la categoría <b>{category.title}</b> de la base de datos y sus subcategorias.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
              <form>
                <input type="hidden" name="id" value={category.id} />
                <AlertDialogAction type="submit" formAction={deleteCategory} className="cursor-pointer">Eliminar</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div >
  )
}