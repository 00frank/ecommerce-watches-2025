import { SupabaseClientType } from "@/types/supabaseClient.type";

export default class BannersQuery {

    static async getBanners(client: SupabaseClientType) {
        const { data } = await client.from("banners")
            .select("*")
            .filter("image_url", "not.is", null)
        return data
    }
}