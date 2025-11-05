"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import Product from "@/types/product.interface";
import { toast } from "sonner";

interface ImageProductInputProps {
  product?: Product | null;
}

export function ImageProductInput({ product }: ImageProductInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('La imagen no puede pesar más de 10MB');
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col">
      <div className="border rounded-lg overflow-hidden">
        <Image
          src={imagePreview || product?.image_url || 'https://hpmcbbwdmsotqwjvewlp.supabase.co/storage/v1/object/public/product-images/defaultimage.jpg'}
          alt={product?.name || 'Imagen del producto'}
          width={500}
          height={500}
          priority
          className="w-full h-80 object-contain bg-gray-50"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg';
          }}
        />
      </div>
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          Cambiar imagen
        </Button>
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  )
};