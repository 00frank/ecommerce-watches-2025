import { CategoryTree } from "@/utils";

interface CategoriesSuperInfoProps {
  count: number;
  categoriesTree: CategoryTree[];
}

export async function CategoriesSuperInfo({ count, categoriesTree }: CategoriesSuperInfoProps) {
  const parentCategories = categoriesTree.filter((category) => category.parent_id === null);

  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow overflow-hidden mb-6 p-4">
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-indigo-600 animate-pulse" /> Total de categorias: {count}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-green-600 animate-pulse" /> Categorias padre: {parentCategories.length}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-yellow-600 animate-pulse" /> Subcategorias: {count - parentCategories.length}
      </p>
    </div>
  );
}