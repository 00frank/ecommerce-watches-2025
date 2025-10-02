"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BannerType } from "@/types/banners.type";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
export default function SliderPromotions({
    banners
}: {
    banners: BannerType[]
}) {


    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, }))

    return (
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[plugin.current]}
            className="overflow-hidden">
            <CarouselContent className="h-full">
                {banners.map((banner) => (
                    <CarouselItem key={banner.id}>
                        <picture>
                            <img
                                loading="lazy"
                                src={banner.image_url!}
                                className="w-full h-full object-cover"
                                alt="promocion relojes"
                            />
                        </picture>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 p-7 cursor-pointer" />
            <CarouselNext className="right-4 p-7 cursor-pointer" />
        </Carousel>
    )
}