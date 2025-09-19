"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
export default function SliderPromotions() {

    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, }))

    return (
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[plugin.current]}
            className="overflow-hidden">
            <CarouselContent className="h-full">
                <CarouselItem>
                    <picture>
                        <source media="(max-width: 768px)"
                            srcSet="slider-mobile-1.webp" />
                        <img
                            loading="lazy"
                            src="slider-1.webp"
                            className="w-full h-full object-cover"
                            alt="promocion relojes"
                        />
                    </picture>
                </CarouselItem>
                <CarouselItem>
                    <picture>
                        <source media="(max-width: 768px)"
                            srcSet="slider-mobile-2.webp" />
                        <img
                            loading="lazy"
                            src="slider-2.webp"
                            className="w-full h-full object-cover"
                            alt="promocion relojes"
                        />
                    </picture>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 p-7 cursor-pointer" />
            <CarouselNext className="right-4 p-7 cursor-pointer" />
        </Carousel>
    )
}