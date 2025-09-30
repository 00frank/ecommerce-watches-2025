'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MainCategoriesSelect } from '../components/MainCategoriesSelect';
import { toast } from 'sonner';

import Category from '@/types/category.interface';
import { Captions } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    mainCategory: { id: 0, title: '' },
    parent_id: 0,
    is_active: true,
    meta_title: '',
    meta_description: '',
  });
  const supabase = createClient();


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select(`*, mainCategory:parent_id(*)`)
          .eq('id', id)
          .single();

        if (error) throw error;
        console.log("data", data);
        setCategory(data);
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          mainCategory: data.mainCategory || null,
          parent_id: data.parent_id || 0,
          is_active: data.is_active || true,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
        });
      } catch (err) {
        console.error('Error al cargar la categoria:', err);
        setError('No se pudo cargar la categoria');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const categoryData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        parent_id: !!formData.parent_id ? formData.parent_id : null,
        is_active: formData.is_active,
        meta_title: !!formData.meta_title ? formData.meta_title : null,
        meta_description: !!formData.meta_description ? formData.meta_description : null,
      };

      console.log("categoryData", categoryData);
      // Update product data
      const { error, data } = await supabase
        .from('categories')
        .update({
          ...categoryData
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Categoria actualizada correctamente');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_active: checked
    }));
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      toast.error('Error al eliminar la categoria: ' + error.message);
      return;
    };

    toast.success('Categoria eliminada correctamente');
    router.push('/admin/categorias');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error || 'Categoria no encontrada'}</p>
        <Button onClick={() => router.push('/admin/categorias')} className="mt-4">
          Volver a la lista
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Categoria</h1>
        <Button variant="outline" onClick={() => router.push('/admin/categorias')}>
          Volver
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titulo*</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Titulo"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="slug">Identificador web*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">/</span>
                    <Input
                      id="slug"
                      name="slug"
                      type="text"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder=""
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2 w-2/4">
                  <Label htmlFor="is_active">Mostrar en la web</Label>
                  <Switch
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onCheckedChange={handleAvailabilityChange}
                  />
                  <p className="inline pl-2 text-sm">
                    {formData.is_active ? "Si" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4 h-[66px]">
                <div className="space-y-2 w-2/6">
                  <Label htmlFor="is_subcategory">Es subcategoria?</Label>
                  <Switch
                    name="is_subcategory"
                    id="is_subcategory"
                    checked={!!formData.parent_id}
                    disabled
                  />
                  <p className="inline pl-2 text-sm">
                    {!!formData.parent_id ? "Si" : "No"}
                  </p>
                </div>
                {!!formData.parent_id && (
                  <div className="space-y-2 w-4/6">
                    <Label htmlFor="categoryId">Categoría padre</Label>
                    <MainCategoriesSelect value={formData.parent_id.toString()} onValueChange={handleInputChange} required />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Titulo para SEO</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Captions className="size-4" />
                </span>
                <Input
                  id="meta_title"
                  name="meta_title"
                  type="text"
                  placeholder=""
                  className="pl-8"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Descripción</Label>
              <textarea
                id="meta_description"
                name="meta_description"
                rows={4}
                autoCorrect="off"
                autoCapitalize="off"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm resize-none"
                value={formData.meta_description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex justify-between space-x-4">
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
}