import { ConfigurationsType } from "@/types/configurations.type";
import { SupabaseClientType } from "@/types/supabaseClient.type";

export default class ConfigurationsQuery {

    static async getConfiguration(client: SupabaseClientType, field: "*" | string = "*") {
        const res = await client.from("configurations").
            select(field).single()
        return (res.data || {}) as ConfigurationsType
    }

}