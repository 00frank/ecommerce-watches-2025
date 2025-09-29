export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.5"
    }
    public: {
        Tables: {
            categories: {
                Row: {
                    created_at: string
                    description: string | null
                    id: number
                    is_active: boolean
                    meta_description: string | null
                    meta_title: string | null
                    parent_id: number | null
                    slug: string | null
                    title: string | null
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    is_active?: boolean
                    meta_description?: string | null
                    meta_title?: string | null
                    parent_id?: number | null
                    slug?: string | null
                    title?: string | null
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    is_active?: boolean
                    meta_description?: string | null
                    meta_title?: string | null
                    parent_id?: number | null
                    slug?: string | null
                    title?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "categories_parent_id_fkey"
                        columns: ["parent_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
            configurations: {
                Row: {
                    address: string | null
                    asking_message: string | null
                    created_at: string
                    email: string | null
                    facebook: string | null
                    id: number
                    instagram: string | null
                    phone_number: string | null
                    welcome_message: string | null
                }
                Insert: {
                    address?: string | null
                    asking_message?: string | null
                    created_at?: string
                    email?: string | null
                    facebook?: string | null
                    id?: number
                    instagram?: string | null
                    phone_number?: string | null
                    welcome_message?: string | null
                }
                Update: {
                    address?: string | null
                    asking_message?: string | null
                    created_at?: string
                    email?: string | null
                    facebook?: string | null
                    id?: number
                    instagram?: string | null
                    phone_number?: string | null
                    welcome_message?: string | null
                }
                Relationships: []
            }
            product_audit_log: {
                Row: {
                    action: string
                    changed_at: string | null
                    id: number
                    new_data: Json | null
                    old_data: Json | null
                    product_id: number
                }
                Insert: {
                    action: string
                    changed_at?: string | null
                    id?: number
                    new_data?: Json | null
                    old_data?: Json | null
                    product_id: number
                }
                Update: {
                    action?: string
                    changed_at?: string | null
                    id?: number
                    new_data?: Json | null
                    old_data?: Json | null
                    product_id?: number
                }
                Relationships: []
            }
            products: {
                Row: {
                    asked_count: number | null
                    brand: string | null
                    category_id: number | null
                    color: string | null
                    created_at: string
                    id: number
                    image_url: string | null
                    is_active: boolean | null
                    name: string | null
                    price: number | null
                    quantity: number | null
                    sku: string | null
                    description: string | null
                }
                Insert: {
                    asked_count?: number | null
                    brand?: string | null
                    category_id?: number | null
                    color?: string | null
                    created_at?: string
                    id?: number
                    image_url?: string | null
                    is_active?: boolean | null
                    name?: string | null
                    price?: number | null
                    quantity?: number | null
                    sku?: string | null
                    description?: string | null
                }
                Update: {
                    asked_count?: number | null
                    brand?: string | null
                    category_id?: number | null
                    color?: string | null
                    created_at?: string
                    id?: number
                    image_url?: string | null
                    is_active?: boolean | null
                    name?: string | null
                    price?: number | null
                    quantity?: number | null
                    sku?: string | null
                    description?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "products_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_brands_by_category_id: {
                Args: { categories_id: number[] }
                Returns: {
                    brand: string
                    product_count: number
                }[]
            }
            get_brands_by_product_name: {
                Args: { product_name: string }
                Returns: {
                    brand: string
                    product_count: number
                }[]
            }
            get_brands_by_slug_param: {
                Args: { slugs: string[] }
                Returns: {
                    brand: string
                    product_count: number
                }[]
            }
            get_brands_by_slugs: {
                Args: { slugs: string[] }
                Returns: {
                    brand: string
                    product_count: number
                }[]
            }
            total_asked_count: {
                Args: Record<PropertyKey, never>
                Returns: number
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const