"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { BrandDTO, CategoryDTO } from "@/types/productType";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: BrandDTO;
  category: CategoryDTO;
  gender: string;
  images: string[];
  price: number;
  rating: number;
  sold: number;
  dateAdded: string;
}

interface ProductCardProps {
  product: Product;
  cart: string[];
  handleAddToCart: (id: string) => void;
}

const ProductCard = ({ product, cart, handleAddToCart }: ProductCardProps) => {
  const isInCart = cart?.includes(product._id);
  const hasMultipleImages = product.images.length > 1;

  return (
    <Card className="overflow-hidden transition hover:shadow-lg group border-border w-full max-w-65 sm:max-w-65">
      <CardHeader className="p-0">
        <Carousel className="relative w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-44 w-full bg-muted">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    sizes="260px"
                    className="object-contain p-2"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* NAVIGATION ARROWS */}
          {hasMultipleImages && (
            <>
              <CarouselPrevious className="left-1 h-7 w-7 bg-background/80 border border-border shadow-sm hover:bg-background" />
              <CarouselNext className="right-1 h-7 w-7 bg-background/80 border border-border shadow-sm hover:bg-background" />
            </>
          )}
        </Carousel>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <Link
              href={`/products/${product._id}`}
              className="text-base font-semibold line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {product.brand.name}
            </p>
          </div>
          <div className="flex items-center text-yellow-500 text-xs">
            <Star className="h-4 w-4 fill-yellow-500 mr-1" />
            {product.rating?.toFixed(1)}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mt-1">
          <span className="font-semibold text-lg">₹{product.price}</span>
          <span className="text-muted-foreground text-xs">
            {product.sold} sold
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddToCart(product._id)}
          variant={isInCart ? "secondary" : "default"}
          className="w-full"
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
