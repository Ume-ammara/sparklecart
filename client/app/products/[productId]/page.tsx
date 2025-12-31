"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, HeartOff, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDTO } from "@/types/productType";

export default function ProductPage(product: ProductDTO) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const toggleWishlist = () => setWishlisted((prev) => !prev);

  const addToCart = () => {
    // TODO: call add to cart API
    console.log("Added to cart", product._id, quantity);
  };

  const buyNow = () => {
    // TODO: direct buy flow
    console.log("Buy now", product._id, quantity);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        {product.images && product.images.length > 0 ? (
          product.images.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <div className="relative aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold">${product.price}</p>

        {product.description && (
          <p className="text-sm text-muted-foreground">{product.description}</p>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={decrement}>
            -
          </Button>
          <span className="px-4">{quantity}</span>
          <Button size="sm" onClick={increment}>
            +
          </Button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button className="flex-1" onClick={addToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
          <Button className="flex-1" variant="secondary" onClick={buyNow}>
            Buy Now
          </Button>
        </div>

        {/* Wishlist */}
        <div className="mt-2">
          <Button size="icon" variant="ghost" onClick={toggleWishlist}>
            {wishlisted ? (
              <Heart className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOff className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Stock info */}
        {/* {product.stock && (
          <p className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        )} */}
      </div>
    </div>
  );
}
