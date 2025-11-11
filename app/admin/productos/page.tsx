import Link from 'next/link';
import { createClient } from "@/lib/supabase/server"
import { ProductCard } from './components/ProductCard';
import { Product } from '@/types';
import { ProductsSuperInfo } from './components/ProductsSuperInfo';
import PaginationProducts from './components/Pagination';

// Número de productos por página
const ITEMS_PER_PAGE = 10;

export const revalidate = 30;

type SearchParams = Promise<{ page?: string }>;

export default async function ProductosPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const params = await searchParams;

  const page = params?.page
    ? Number(params.page)
    : 0;

  const from = (page) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .order('name', { ascending: false });

  const { data: products, error } = await supabase
    .from('products')
    .select('*, category:category_id(*)')
    .order('name', { ascending: true })
    .range(from, to);

  if (error) {
    return <div>Error al cargar los productos</div>;
  }

  const totalPages = count ? Math.ceil((count / ITEMS_PER_PAGE) - 1) : 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>
      <ProductsSuperInfo count={count || 0} />
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
      <PaginationProducts pagination_info={{
        current_page: page,
        total_pages: totalPages
      }} />
    </div>
  );
}
