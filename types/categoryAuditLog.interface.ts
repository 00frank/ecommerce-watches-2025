import Category from "./category.interface";

interface CategoryAuditLog {
    id: number;
    category_id: number;
    action: string;
    old_data: Category;
    new_data: Category;
    changed_at: string;
}

export default CategoryAuditLog