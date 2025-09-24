import Category from "./category.interface";

interface Product {
    id: number
    name: string
    has_stock: boolean
    sku: string
    brand: string
    description: string
    is_active: boolean
    color: string
    category_id: number
    created_at: string
    category: Category
    image_url: string
}

export default Product 