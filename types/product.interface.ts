import Category from "./category.interface";

interface Product {
    id: number;
    name: string;
    has_stock: boolean;
    sku: string;
    brand: string;
    is_active: boolean;
    color: string;
    category_id: number;
    created_at: string;
    category: Category["title"];
    image_url: string;
}

export default Product 