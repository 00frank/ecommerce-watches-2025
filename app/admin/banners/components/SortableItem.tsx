'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SortableItemProps {
  id: string;
  src: string;
  onRemove: () => void;
  order: number;
}

export function SortableItem({ id, src, onRemove, order }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group rounded-lg overflow-hidden border border-gray-200 bg-white',
        isDragging && 'ring-2 ring-blue-500 shadow-lg'
      )}
    >
      <div className="absolute top-2 right-2 z-10">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Eliminar imagen</span>
        </Button>
      </div>
      
      <div className="relative pt-[100%]">
        <img
          src={src}
          alt={`Banner ${order}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 cursor-move"
          {...attributes}
          {...listeners}
        >
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {order}
          </div>
        </div>
      </div>
    </div>
  );
}
