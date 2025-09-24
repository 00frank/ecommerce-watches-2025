import Link from 'next/link';
import { createClient } from "@/utils/supabase/server"
import { Product } from '@/types';
import { ProductCard } from './components/ProductCard';
import { ProductsSuperInfo } from './components/ProductsSuperInfo';

// Número de productos por página
const ITEMS_PER_PAGE = 10;

export const revalidate = 30;

type SearchParams = Promise<{ page?: string }>;

export default async function ProductosPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const params = await searchParams;

  const page = params?.page
    ? Math.max(1, parseInt(params.page || '1', 10))
    : 1;

  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  const { data: products, error } = await supabase
    .from('products')
    .select('*, category:category_id(*)')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return <div>Error al cargar los productos</div>;
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>
      <ProductsSuperInfo count={count || 0} />
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            {page > 1 && (
              <Link
                href={`/admin/productos?page=${page - 1}`}
                className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Anterior
              </Link>
            )}
          </div>
          <div className="hidden md:-mt-px md:flex">
            {pageNumbers.map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/admin/productos?page=${pageNumber}`}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${page === pageNumber
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {pageNumber}
              </Link>
            ))}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            {page < totalPages && (
              <Link
                href={`/admin/productos?page=${page + 1}`}
                className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Siguiente
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
