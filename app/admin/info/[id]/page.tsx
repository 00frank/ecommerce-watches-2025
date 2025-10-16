"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Database } from "@/types/database.type";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

async function getPageById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('pages').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createPage(formData: Database['public']['Tables']['pages']['Insert']) {
  const supabase = createClient();
  const { error } = await supabase.from('pages').insert(formData);
  if (error) throw error;
  return true;
}

export default function Page() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    is_active: true,
  });
  const router = useRouter();

  useEffect(() => {
    const loadPage = async () => {
      try {
        if (id) {
          const page = await getPageById(id as string);
          if (!page) {
            toast.error('Página no encontrada');
            router.back();
            return;
          }
          setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content,
            is_active: page.is_active || false,
          });
        }
      } catch (error) {
        setError('Error al cargar la página');
      } finally {
        setIsLoading(false);
      }
    }
    loadPage();
  }, [])

  const handleCreate = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      setIsEditing(true);
      const newPage = await createPage(formData);
      if (newPage) {
        toast.success('Página creada correctamente');
        router.replace('/admin/info');
      }
    } catch (error) {
      toast.error('Error al crear la página');
    } finally {
      setIsEditing(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_active: checked }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error || 'Producto no encontrado'}</p>
        <Button onClick={() => router.push('/admin/info')} className="mt-4">
          Volver a la lista
        </Button>
      </div>
    );
  }


  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Nueva Página</h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => {
                handleInputChange(e);
                setFormData(prev => ({
                  ...prev
                }));
              }}
              onBlur={(e) => {
                handleInputChange(e);
                setFormData(prev => ({
                  ...prev,
                  slug: generateSlug(e.target.value)
                }));
              }}
              placeholder="Ej: Sobre Nosotros"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="ej: sobre-nosotros"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              placeholder="Escribe el contenido de la página aquí..."
              className="min-h-[200px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="is_active">Página activa</Label>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={isEditing}>
              <Save className="mr-2 h-4 w-4" /> Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}