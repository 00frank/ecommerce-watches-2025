import { Category, Product } from "@/types"

const productMock: Product = {
    id: 1,
    name: "LAT-CRON 3",
    has_stock: true,
    sku: "SKU1",
    brand: "Swetter",
    color: "Amarillo",
    category_id: 1,
    image_url: "/card-reloj.webp",
    category: { id: 1, title: "Categoria 1", slug: "categoria-1", parent_id: null, is_active: true, meta_title: "Categoria 1", meta_description: "Categoria 1", created_at: new Date().toUTCString(), subCategories: [], description: "Categoria 1" } as unknown as Category,
    created_at: new Date().toUTCString(),
    is_active: true,
    price: 100,
    quantity: 10,
    description: "Descripción del producto"
}

export default productMock
