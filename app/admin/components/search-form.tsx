'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Package, Tag } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Label } from '@/components/ui/label';
import { SidebarInput } from '@/components/ui/sidebar';
import Link from 'next/link';

type SearchResult = {
  type: 'product' | 'category';
  id: number | string;
  name: string;
  url: string;
  brand?: string;
};

export function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Cerrar los resultados al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Buscar cuando el query cambia
  useEffect(() => {
    const search = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        // Buscar productos
        const { data: products } = await supabase
          .from('products')
          .select('id, name, image_url, is_active')
          .ilike('name', `%${query}%`)
          .limit(3);

        // Buscar categorías
        const { data: categories } = await supabase
          .from('categories')
          .select('id, title, slug')
          .ilike('title', `%${query}%`)
          .limit(3);

        const categoryResults: SearchResult[] = (categories || []).map(category => ({
          type: 'category',
          id: category.id,
          name: category.title,
          url: `/admin/categorias/${category.id}`
        }));

        const productResults: SearchResult[] = (products || []).map(product => ({
          type: 'product',
          id: product.id,
          name: product.name,
          url: `/admin/productos/${product.id}`
        }));

        setResults([...categoryResults, ...productResults]);
        setIsOpen(true);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative ml-auto w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Buscar
        </Label>
        <div className="relative">
          <SidebarInput
            id="search"
            placeholder="Buscar producto/categoría..."
            className="h-9 pl-9 pr-8 w-full"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() === '') {
                setResults([]);
                setIsOpen(false);
              }
            }}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          />
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </button>
          )}
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-2">
            {results.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.url}
                className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
              >
                {item.type === 'product' ? (
                  <Package className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Tag className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="truncate">{item.name}</span>
                <span className="text-gray-500">{item.type === 'product' ? item.brand : 'Categoría'}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {item.type === 'product' ? 'Producto' : 'Categoría'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {isLoading && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-4 text-sm text-muted-foreground">
          Buscando...
        </div>
      )}

      {/* Sin resultados */}
      {isOpen && query.length >= 2 && !isLoading && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-4 text-sm text-muted-foreground">
          No se encontraron resultados para &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
