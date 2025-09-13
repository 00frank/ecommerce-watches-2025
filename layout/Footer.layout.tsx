import categories from "@/mocks/categories.mock"
import Link from "next/link"
import clsx from "clsx"

const keys = categories.map((category) => category.name)

const contactLinks = [
    {
        name: "Contacto",
        href: "/contacto",
    },
    {
        name: "Empresa",
        href: "/empresa",
    },
    {
        name: "Preguntas Frecuentes",
        href: "/preguntas-frecuentes",
    }
]

const LinkItem = ({ name, href, className }: { name: string, href: string, className?: string }) => {
    return (
        <li className={clsx(
            "hover:underline text-black/60 hover:text-black transition-colors duration-200  cursor-pointer",
            className
        )}>
            <Link replace href={href}>{name}</Link>
        </li>
    )
}

const Menu = () => {
    return (
        <section className="space-y-4">
            <h4 className="text-xl">Menú</h4>
            <ul className="space-y-2">
                {keys.map((key) => (
                    <LinkItem
                        key={key}
                        className="uppercase"
                        name={key}
                        href={`/${key}`} />
                ))}
            </ul>
        </section>
    )
}

const Info = () => {
    return (
        <section className="  space-y-4 h-full">
            <h4 className="text-xl">Información</h4>
            <ul className="space-y-2">
                {contactLinks.map((link) => (
                    <LinkItem
                        key={link.name}
                        name={link.name}
                        href={link.href} />
                ))}
            </ul>
        </section>
    )
}

const AboutUs = () => {
    return (
        <section className="space-y-4  h-full">
            <h4 className="text-xl">El Mundo del Reloj</h4>
            <p className="text-black/60">
                Desde hace 40 años proveemos a todo el país de toda la gama de productos para joyerías,
                relojerías, artesanos, revendedores e independientes.
            </p>
        </section>
    )
}

export default function Footer() {
    return (
        <footer className="p-24">
            <div className="grid w-full max-w-5xl mx-auto grid-cols-1 gap-8 lg:grid-cols-3">
                <Menu />
                <Info />
                <AboutUs />
            </div>
        </footer>
    )
}