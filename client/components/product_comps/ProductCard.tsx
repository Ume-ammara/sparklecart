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

interface Product {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  gender: string;
  images: string[];
  price: number;
  rating: number;
  sold: number;
  dateAdded: string;
}

interface ProductCardProps {
  product: Product;
  cart: number[];
  handleAddToCart: (id: number) => void;
}

const ProductCard = ({ product, cart, handleAddToCart }: ProductCardProps) => {
  const isInCart = cart.includes(product.id);

  return (
    <Card className="overflow-hidden transition hover:shadow-lg group border-border">
      <CardHeader className="p-0">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold line-clamp-1">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground">{product.company}</p>
          </div>
          <div className="flex items-center text-yellow-500 text-xs">
            <Star className="h-4 w-4 fill-yellow-500 mr-1" />
            {product.rating.toFixed(1)}
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
          onClick={() => handleAddToCart(product.id)}
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
