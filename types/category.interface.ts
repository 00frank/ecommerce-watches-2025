interface Category {
    id: number;
    title: string;
    slug: string;
    description: string;
    parent_id: number;
    is_active: boolean;
    meta_title: string;
    meta_description: string;
    created_at: string;
    subCategories?: Array<Category>;
}

export default Category 