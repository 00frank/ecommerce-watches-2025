import Category from "./category.interface";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    sku: string;
    brand: string;
    color: string;
    category_id: number;
    created_at: string;
    category: Category;
    image_url: string;
    is_active: boolean;
}

export default Product 