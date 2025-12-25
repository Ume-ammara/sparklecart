"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
  images: string[];
  category: {
    name: string;
  };
  brand: {
    slug: string;
    name: string;
  };
};

interface SellerProductCardProps {
  product: Product;
}

const SellerProductCard = ({ product }: SellerProductCardProps) => {
  const hasMultipleImages = product.images.length > 1;

  return (
    <Card className="w-full max-w-65 sm:max-w-65 rounded-sm border border-border bg-card">
      {/* IMAGE */}
      <div className="relative border-b border-border">
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
      </div>

      {/* CONTENT */}
      <CardContent className="p-3 space-y-2">
        {/* BRAND */}
        <p className="text-xs text-muted-foreground truncate">
          {product.brand.name}
        </p>

        {/* NAME */}
        <h3 className="text-sm font-medium leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* PRICE + CATEGORY */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <Badge variant="outline" className="text-[11px]">
            {product.category.name}
          </Badge>
        </div>

        {/* STOCK */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Stock: {product.quantity}
          </span>

          <span
            className={product.inStock ? "text-green-600" : "text-destructive"}
          >
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="p-2 border-t border-border flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-center text-xs"
        >
          <Pencil className="h-3.5 w-3.5 mr-1" />
          Edit
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-center text-xs text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SellerProductCard;
