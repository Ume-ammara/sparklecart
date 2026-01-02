"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/store/productStore";
import ProductImageCarousel from "@/components/product_comps/ProductImageCarousel";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart, carts, fetchAllCarts } = useCartStore();
  const { product, fetchProductById, isLoading, error } = useProductStore();
  console.log("slug", slug);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (slug) {
      fetchProductById(slug as string);
    }
  }, [slug, fetchProductById]);

  useEffect(() => {
    if (carts === null) {
      fetchAllCarts();
    }
  }, [carts, fetchAllCarts]);

  const handleAddToCart = async () => {
    if (product != null) {
      await addToCart(product._id);
    }
  };
  console.log("carts", carts);
  console.log("product", product);
  if (isLoading) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT – IMAGE GALLERY */}
      <div className="space-y-4">
        <ProductImageCarousel product={product} />
      </div>

      {/* RIGHT – PRODUCT INFO */}
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold leading-snug">{product.name}</h1>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">Rs {product.price}</span>
        </div>

        <p className="text-sm text-muted-foreground">
          In stock: {product.quantity}
        </p>

        <Separator />

        {/* QUANTITY */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4">{qty}</span>
            <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <Button className="flex-1 gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>

          {/* <Button className="flex-1 gap-2" onClick={handleAddToCart}>
            // <ShoppingCart className="w-4 h-4" />
            // Add to Cart //{" "}
          </Button> */}
          <Button variant="outline" className="flex-1">
            Buy Now
          </Button>
        </div>

        {/* WISHLIST */}
        <Button variant="ghost" className="gap-2 w-fit">
          <Heart className="w-5 h-5" />
          Add to wishlist
        </Button>

        {/* DELIVERY INFO */}
        <Card className="p-4 space-y-3">
          <p className="text-sm font-medium">Eligible for Delivery?</p>

          <div className="flex items-center gap-2">
            <input
              placeholder="Enter Pincode"
              className="border rounded-md px-3 py-2 text-sm w-40"
            />
            <Button size="sm" variant="secondary">
              Check
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            <p>✔ Easy returns</p>
            <p>✔ Cash on delivery</p>
            <p>✔ Fast shipping</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
