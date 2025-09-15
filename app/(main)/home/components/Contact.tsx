import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Contact() {
    return (
        <section className="h-full relative">
            <picture>
                <source media="(max-width: 768px)"
                    srcSet="wsp-mobile.webp" />
                <img
                    loading="lazy"
                    src="wsp.webp"
                    className="object-cover"
                    alt="Contacto" />
            </picture>
            <Button
                variant="link"
                className={cn(
                    "absolute bottom-1/2 left-1/2 -translate-x-1/2",
                    "shadow-xl border border-black/5 hover:scale-105 bg-white uppercase cursor-pointer p-7",
                    "md:bottom-1/12 md:left-1/2 md:-translate-x-1/4 md:-translate-y-1/2"
                )}>
                <a
                    target="_blank"
                    href="https://wa.me/1">
                    Contactarme
                </a>
            </Button>
        </section>
    )
}