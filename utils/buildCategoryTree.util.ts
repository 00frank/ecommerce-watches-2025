import { Category } from "@/types"
import { CategoryDatabase } from "@/types/category.interface"

export type CategoryTree = Category

export function buildCategoryTree(rows: Array<CategoryDatabase>): Array<CategoryTree> {


  const byId = new Map<number, CategoryTree>()

  // 1) Crear nodos
  for (const r of rows) {
    const { ...rest } = r
    byId.set(r.id, { ...rest, subCategories: [] })
  }

  // 2) Enlazar hijos a su padre (o enviar a raíces si no hay padre válido)
  const roots: CategoryTree[] = []
  for (const r of rows) {
    const node = byId.get(r.id)!
    const pid = (r as unknown as { parent_id: number | null | undefined }).parent_id

    if (pid == null) {
      roots.push(node)
      continue
    }
    const parent = byId.get(pid)
    if (parent) {
      ; (parent.subCategories as CategoryTree[]).push(node)
    } else {
      // padre inexistente: tratar como raíz para no perderlo
      roots.push(node)
    }
  }

  // 3) Convertir [] -> null de forma recursiva
  const finalize = (n: CategoryTree): CategoryTree => {
    const kids = n.subCategories as CategoryTree[]
    if (kids && kids.length) {
      return { ...n, subCategories: kids.map(finalize) }
    }
    return { ...n, subCategories: [] }
  }

  return roots.map(finalize)
}
