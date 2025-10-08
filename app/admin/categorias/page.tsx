import { createClient } from "@/lib/supabase/server";
import { buildCategoryTree, CategoryTree } from '@/utils';
import { CategoriesSuperInfo } from './components/CategoriesSuperInfo';
import { CategoryCard } from './components/CategoryCard';

// Número de productos por página
const ITEMS_PER_PAGE = 10;

export const revalidate = 30;

export default async function CategoriasPage() {
  const supabase = await createClient();

  const { count } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });
  // .range(from, to);

  if (error) {
    return <div>Error al cargar las categorias</div>;
  }

  const categoriesTree = buildCategoryTree(categories);

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Categorias</h1>
      <CategoriesSuperInfo categoriesTree={categoriesTree} count={count || 0} />
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {categoriesTree?.map((category: CategoryTree) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
