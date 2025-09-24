import { Category, Product } from "@/types"

export type CategoryTree = Omit<Category, 'subCategories'> & {
  subCategories: CategoryTree[] | null
}

export function buildCategoryTree(rows: Category[]): CategoryTree[] {
  const byId = new Map<number, CategoryTree>()

  // 1) Crear nodos
  for (const r of rows) {
    const { subCategories: _omit, ...rest } = r
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
      (parent.subCategories as CategoryTree[]).push(node)
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
    return { ...n, subCategories: null }
  }

  return roots.map(finalize)
}

export function getColorForAudit(action: string) {
  if (action === "CREATE") return "bg-green-500 text-white"
  if (action === "UPDATE") return "bg-blue-500 text-white"
  if (action === "DELETE") return "bg-red-500 text-white"
}

export function getIconForAudit(action: string) {
  if (action === "CREATE") return "✨"
  if (action === "UPDATE") return "✏️"
  if (action === "DELETE") return "🗑️"
  return ""
}

export function getLabelForAudit(action: string) {
  if (action === "CREATE") return "Creación"
  if (action === "UPDATE") return "Actualización"
  if (action === "DELETE") return "Eliminación"
}

export type DiffProductItem = {
  field: string;
  oldValue: string;
  newValue: string;
};

export function getAuditLogDiff(oldValue: Record<string, any>, newValue: Record<string, any>) {
  const diff: DiffProductItem[] = [];
  const allKeys = new Set([
    ...Object.keys(oldValue || {}),
    ...Object.keys(newValue || {}),
  ]);

  allKeys.forEach((key) => {
    const oldVal = oldValue?.[key];
    const newVal = newValue?.[key];

    if (oldVal !== newVal) {
      diff.push({
        field: key,
        oldValue: oldVal,
        newValue: newVal,
      });
    }
  });

  return diff;
}
