"use client";

import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/utils/supabase/client"
import { buildCategoryTree, CategoryTree } from "@/utils";
import { Category } from "@/types";

interface CategoriesSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function MainCategoriesSelect({
  value,
  onValueChange,
}: CategoriesSelectProps) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*').filter('parent_id', 'is', null);

      if (error) throw error;
      setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        {loading ? (
          <SelectValue>Cargando...</SelectValue>
        ) : (
          <SelectValue placeholder="Selecciona una categoría principal" />
        )}
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.title}>
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}