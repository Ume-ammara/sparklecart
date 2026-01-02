"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductDTO } from "@/types/productType";

interface ProductCarousalProps {
  product: ProductDTO;
}

export default function ProductImageCarousel({
  product,
}: ProductCarousalProps) {
  const images = product.images.length > 1;

  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {product.images.map((img, index) => (
          <CarouselItem key={index} className="basis-full flex justify-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={img}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* LEFT */}
      <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow" />

      {/* RIGHT */}
      <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow" />
    </Carousel>
  );
}
