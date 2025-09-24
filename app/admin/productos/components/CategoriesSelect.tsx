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
import { createClient } from "@/lib/supabase/client"
import { buildCategoryTree, CategoryTree } from "@/utils/buildCategoryTree.util";

interface CategoriesSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function CategoriesSelect({
  value,
  onValueChange,
}: CategoriesSelectProps) {
  const [loading, setLoading] = useState(true);
  const [categoriesTree, setCategoriesTree] = useState<CategoryTree[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      setCategoriesTree(buildCategoryTree(data));
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
          <SelectValue placeholder="Selecciona una categoría" />
        )}
      </SelectTrigger>
      <SelectContent>
        {categoriesTree.map((category) => (
          <SelectGroup key={category.id}>
            {!category.subCategories && (
              <>
                <SelectLabel>{category.title}</SelectLabel>
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.title}
                </SelectItem>
              </>
            )}
            {category.subCategories && (
              <>
                <SelectLabel>{category.title}</SelectLabel>
                {category.subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                    {subCategory.title}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ServerCategoriesSelect() {
  const [loading, setLoading] = useState(true);
  const [categoriesTree, setCategoriesTree] = useState<CategoryTree[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      setCategoriesTree(buildCategoryTree(data));
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <Select required name="categoryId" disabled={loading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={loading ? "Cargando..." : "Selecciona una categoría"} />
      </SelectTrigger>
      <SelectContent>
        {categoriesTree.map((category) => (
          <SelectGroup key={category.id}>
            {!category.subCategories && (
              <>
                <SelectLabel>{category.title}</SelectLabel>
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.title}
                </SelectItem>
              </>
            )}
            {category.subCategories && (
              <>
                <SelectLabel>{category.title}</SelectLabel>
                {category.subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                    {subCategory.title}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
