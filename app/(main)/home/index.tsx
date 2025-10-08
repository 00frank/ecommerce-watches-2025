import { createClient } from "@/lib/supabase/server";
import Contact from "./components/Contact";
import SliderPromotions from "./components/SliderPromotions";
import BannersQuery from "@/lib/supabase/queries/banners.query";

export default async function Home() {

    const banners = await BannersQuery.getBanners(await createClient())

    return (
        <main className="h-full ">
            <SliderPromotions banners={banners || []} />
            <Contact />
        </main>
    )
}