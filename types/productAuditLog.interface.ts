import Product from "./product.interface";

interface ProductAuditLog {
    id: number;
    product_id: number;
    action: string;
    old_data: Product;
    new_data: Product;
    changed_at: string;
}

export default ProductAuditLog