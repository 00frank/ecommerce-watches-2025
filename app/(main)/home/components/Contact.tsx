import ContactButton from "./ContactButton";

export default function Contact() {
    return (
        <section className="h-full relative">
            <picture>
                <source media="(max-width: 768px)"
                    srcSet="wsp-mobile.webp" />
                <img
                    loading="lazy"
                    src="wsp.webp"
                    className="object-contain w-full"
                    alt="Contacto" />
            </picture>
            <ContactButton />
        </section>
    )
}