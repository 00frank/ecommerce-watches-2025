'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './components/SortableItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Save } from 'lucide-react';

type BannerImage = {
  id: string;
  file: File;
  preview: string;
  order: number;
};

export default function BannersPage() {
  const [images, setImages] = useState<BannerImage[]>([]);
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

  // Guardar los cambios
  const handleSave = () => {
    setIsSaving(true);
    
    // Aquí irá la lógica para guardar en Supabase
    console.log('Imágenes a guardar:', images);
    
    // Simulamos un guardado
    setTimeout(() => {
      setIsSaving(false);
      // Aquí podrías mostrar un toast de éxito
    }, 1500);
  };

  // Limpiar las URLs de las previsualizaciones al desmontar
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

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
        <CardHeader>
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

      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imágenes del banner ({images.length})</CardTitle>
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
                  {images.map((image) => (
                    <SortableItem 
                      key={image.id} 
                      id={image.id}
                      src={image.preview} 
                      onRemove={() => removeImage(image.id)}
                      order={image.order + 1}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </CardContent>
        </Card>
      )}
    </div>
  );
}