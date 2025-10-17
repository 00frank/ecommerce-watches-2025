import CategoriesList from "./components/CategoriesList"
import LinkItem from "./components/LinkItem"
import CategoriesQuery from "@/lib/supabase/queries/categories.query"
import { createClient } from "@/lib/supabase/server"


const Info = async () => {
    const supabase = await createClient();
    const { data: contactLinks } = await supabase.from('pages').select('*').eq('is_active', true);

    return (
        <section className="  space-y-4 h-full">
            <h4 className="text-xl">Información</h4>
            <ul className="space-y-2">
                {contactLinks?.map((link) => (
                    <LinkItem
                        key={link.title}
                        name={link.title}
                        href={"/info/"+link.slug} />
                ))}
            </ul>
        </section>
    )
}

const AboutUs = () => {
    return (
        <section className="space-y-4  h-full">
            {/* <h4 className="text-xl">El Mundo del Reloj</h4>
            <p className="text-default-800">
                Desde hace 40 años proveemos a todo el país de toda la gama de productos para joyerías,
                relojerías, artesanos, revendedores e independientes.
            </p> */}
        </section>
    )
}

export default async function Footer() {
    const categories = await CategoriesQuery.getAllCategories(await createClient())
    return (
        <footer className="p-24 border-t border-t-black/10 bg-[#fafafa]">
            <div className="grid w-full max-w-5xl mx-auto grid-cols-1 gap-8 lg:grid-cols-3">
                <CategoriesList categories={categories} />
                <Info />
                <AboutUs />
            </div>
        </footer>
    )
}