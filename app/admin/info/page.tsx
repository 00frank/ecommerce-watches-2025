'use client';

import { useState, useEffect } from 'react';
import { Database } from '@/types/database.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Link from 'next/link';

const supabase = createClient();

async function getAllPages() {
  const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function deletePage(id: string) {
  const { error } = await supabase.from('pages').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export default function PagesAdminPage() {
  const [pages, setPages] = useState<Database['public']['Tables']['pages']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPages();
      setPages(data);
    } catch (error) {
      toast.error('Error al cargar las páginas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta página?')) return;

    try {
      const success = await deletePage(id);
      if (success) {
        toast.success('Página eliminada correctamente');
        loadPages();
      }
    } catch (error) {
      toast.error('Error al eliminar la página');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de páginas</h1>
        <Link href="/admin/info/agregar">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva página
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle>Páginas existentes</CardTitle>
            <CardDescription>
              {isLoading ? (
                <span className="">
                  <Skeleton className="h-5 w-24" />
                </span>
              ) : (
                <span>{pages.length} {pages.length === 1 ? 'página' : 'páginas'} en total</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            ) : pages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay páginas creadas
              </div>
            ) : (
              <div className="space-y-4">
                {pages.map((page) => (
                  <Card key={page.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{page.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            /{page.slug}
                          </p>
                          <div className="mt-2 flex items-center space-x-2 text-sm">
                            <Badge
                              variant={page.is_active ? 'default' : 'secondary'}
                              className={cn(
                                page.is_active
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              )}
                            >
                              {page.is_active ? 'Activa' : 'Desactivada'}
                            </Badge>
                            <span className="text-muted-foreground">
                              Actualizado: {new Date(page.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/admin/info/${page.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(page.id)}
                            title="Eliminar"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}