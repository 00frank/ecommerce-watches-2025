import { Product } from "@/types"

const productMock: Product = {
    id: 1,
    name: "LAT-CRON 3",
    has_stock: true,
    sku: "SKU1",
    brand: "Swetter",
    color: "Amarillo",
    category_id: 1,
    image_url: "/card-reloj.webp",
    category: "Categoria 1",
    created_at: new Date().toUTCString(),
    is_active: true,
}

export default productMock
