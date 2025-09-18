'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CategoriesSelect } from '../components/CategoriesSelect';
import { toast } from 'sonner';

import Category from '@/types/category.interface';
import Image from 'next/image';

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
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
          .select(`*`)
          .eq('id', id)
          .single();

        if (error) throw error;

        setCategory(data);
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      quantity: checked ? 1 : 0
    }));
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Update product data
      const { error, data } = await supabase
        .from('categories')
        .update({
          ...formData
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
              <Label htmlFor="title">Nombre de la categoria</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nombre de la categoria"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/4">
                  <Label>Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Ej: REL-XYZ-001"
                  />
                </div>
                <div className="space-y-2 w-2/4">
                  <Label>Descripción</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ej: Casio, Rolex, etc."
                  />
                </div>
              </div>
            </div>

            {/* <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/3">
                  <Label htmlFor="price">Precio</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="1"
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2 w-1/3">
                  <Label htmlFor="available">Stock</Label>
                  <Switch
                    id="available"
                    checked={formData.quantity > 0}
                    onCheckedChange={handleAvailabilityChange}
                  />
                </div>
              </div>
            </div> */}

            {/* <div className="space-y-2">
              <div className="flex flex-row gap-4">
                <div className="space-y-2 w-2/3">
                  <Label>Categoría</Label>
                  <CategoriesSelect onValueChange={handleCategoryChange} value={formData.category_id.toString()} />
                </div>
                <div className="space-y-2 w-1/3">
                  <Label>Color</Label>
                  <Input
                    id="color"
                    name="color"
                    type="color"
                    defaultValue={formData.color}
                    onBlur={handleInputChange}
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div className="space-y-6">
            <div>
              {!!category.parent_id && (
                <>
                  <Label>Categoria padre</Label>
                  <Input
                    id="parent_id"
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleInputChange}
                    placeholder="ID de la categoria padre"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push('/admin/productos')}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
}