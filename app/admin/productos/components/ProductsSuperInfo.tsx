import { Product } from "@/types";
import { createClient } from "@/utils/supabase/server";

interface ProductsSuperInfoProps {
  count: number;
}

export async function ProductsSuperInfo({ count }: ProductsSuperInfoProps) {
  const supabase = await createClient();

  const { count: availableProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .gte('quantity', 1);

  const { count: disabledProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', false);

  const { data: totalAskedCount } = await supabase
    .rpc('total_asked_count');

  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow overflow-hidden mb-6 p-4">
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-indigo-600 animate-pulse" /> Total de productos: {count}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-green-600 animate-pulse" /> Productos en stock: {availableProducts}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-red-600 animate-pulse" /> Productos desactivados: {disabledProducts}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-2 h-2 inline-block rounded-full bg-yellow-600 animate-pulse" /> Consultas recibidas: {totalAskedCount}
      </p>
    </div>
  );
}