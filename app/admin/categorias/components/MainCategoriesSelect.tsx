"use client";

import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Category } from "@/types";

interface CategoriesSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  defaultValue?: boolean;
}

export function MainCategoriesSelectWithCheck({
  value,
  onValueChange,
  defaultValue,
}: CategoriesSelectProps) {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <div className="flex flex-row gap-4 h-[66px]">
      <div className="space-y-2 w-2/6">
        <Label htmlFor="is_subcategory">Es subcategoria?</Label>
        <Switch
          name="is_subcategory"
          id="is_subcategory"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="inline pl-2 text-sm">
          {checked ? "Si" : "No"}
        </p>
      </div>

      {checked && (
        <div className="space-y-2 w-4/6">
          <Label htmlFor="categoryId">Categoría padre</Label>
          <MainCategoriesSelect value={value} onValueChange={onValueChange} required />
        </div>
      )}
    </div>
  )
}

export function MainCategoriesSelect({
  value,
  onValueChange,
  required,
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
    <Select required={required} name="category_id" value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        {loading ? (
          <SelectValue>Cargando...</SelectValue>
        ) : (
          <SelectValue placeholder="Selecciona una categoría principal" />
        )}
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}