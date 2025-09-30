'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './components/SortableItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Save } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

type BannerImage = {
  id: string;
  file: File;
  preview: string;
  order: number;
};

type Banner = {
  id: number;
  image_url: string;
  order: number;
  created_at: string;
};

export default function BannersPage() {
  const supabase = createClient();
  const [images, setImages] = useState<BannerImage[]>([]);
  const [existingBanners, setExistingBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Configuración de sensores para el drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Manejador de drop de archivos
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file, index) => ({
      id: `img-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      order: images.length + index,
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  // Manejador del final del arrastre
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          order: index
        }));
      });
    }
  };

  // Eliminar una imagen
  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  // Subir imagen al storage y obtener su URL pública
  const uploadImage = async (file: File, index: number) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `banner-${Date.now()}-${index}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      throw error;
    }
  };

  // Guardar los cambios
  const handleSave = async () => {
    if (images.length === 0) return;
    
    setIsSaving(true);
    
    try {
      // 1. Eliminar banners existentes
      const { error: deleteError } = await supabase
        .from('banners')
        .delete()
        .neq('id', 0); // Esto eliminará todos los registros
      
      if (deleteError) throw deleteError;

      // 2. Subir imágenes y guardar en la base de datos
      const uploadPromises = images.map(async (image, index) => {
        try {
          const imageUrl = await uploadImage(image.file, index);
          
          // 3. Guardar en la tabla banners
          const { error: insertError } = await supabase
            .from('banners')
            .insert([
              { 
                image_url: imageUrl,
                order: index + 1
              }
            ]);
            
          if (insertError) throw insertError;
          
          return { success: true };
        } catch (error) {
          console.error(`Error procesando imagen ${index + 1}:`, error);
          return { success: false, error };
        }
      });

      const results = await Promise.all(uploadPromises);
      const hasErrors = results.some(result => !result.success);
      
      if (hasErrors) {
        throw new Error('Algunas imágenes no se pudieron guardar correctamente');
      }
      
      toast.success('Banners actualizados correctamente');
      
    } catch (error) {
      console.error('Error al guardar los banners:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
      toast.error(`Error al guardar: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Cargar banners existentes al montar el componente
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data: banners, error } = await supabase
          .from('banners')
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;
        
        setExistingBanners(banners || []);
      } catch (error) {
        console.error('Error al cargar los banners:', error);
        toast.error('Error al cargar los banners existentes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Limpiar las URLs de las previsualizaciones al desmontar
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  // Convertir URL de imagen a archivo (para mostrar imágenes existentes)
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: data.type });
  };

  // Cargar imágenes existentes al área de arrastrar
  const loadExistingBanners = async () => {
    try {
      setIsLoading(true);
      const bannerFiles = await Promise.all(
        existingBanners.map(async (banner, index) => {
          const file = await urlToFile(banner.image_url, `banner-${banner.id}.jpg`);
          return {
            id: `existing-${banner.id}`,
            file,
            preview: banner.image_url,
            order: banner.order - 1, // Ajustar a índice base 0
          };
        })
      );
      
      setImages(bannerFiles);
    } catch (error) {
      console.error('Error al cargar imágenes existentes:', error);
      toast.error('Error al cargar las imágenes existentes');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar imágenes existentes cuando cambia el estado de existingBanners
  useEffect(() => {
    if (existingBanners.length > 0) {
      loadExistingBanners();
    }
  }, [existingBanners.length]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Banners</h1>
        <Button onClick={handleSave} disabled={isSaving || images.length === 0}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Subir imágenes</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive 
                  ? 'Suelta las imágenes aquí...' 
                  : 'Arrastra y suelta imágenes aquí, o haz clic para seleccionar archivos'}
              </p>
              <p className="text-xs text-gray-500">Formatos soportados: .jpg, .jpeg, .png, .webp</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {(images.length > 0 || existingBanners.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>
              Imágenes del banner ({images.length > 0 ? images.length : existingBanners.length})
              {existingBanners.length > 0 && images.length === 0 && ' (guardadas)'}
            </CardTitle>
            <p className="text-sm text-gray-500">Arrastra para reordenar las imágenes</p>
          </CardHeader>
          <CardContent>
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-4 gap-4">
                <SortableContext 
                  items={images.map(img => img.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {images.length > 0 ? (
                    images.map((image) => (
                      <SortableItem 
                        key={image.id} 
                        id={image.id}
                        src={image.preview} 
                        onRemove={() => removeImage(image.id)}
                        order={image.order + 1}
                      />
                    ))
                  ) : (
                    existingBanners.map((banner) => (
                      <div 
                        key={`existing-${banner.id}`}
                        className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white"
                      >
                        <div className="relative pt-[100%]">
                          <img
                            src={banner.image_url}
                            alt={`Banner ${banner.order}`}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {banner.order}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </SortableContext>
              </div>
            </DndContext>
          </CardContent>
        </Card>
      )}
    </div>
  );
}