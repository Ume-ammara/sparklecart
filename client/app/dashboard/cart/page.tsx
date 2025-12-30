"use client";

import { useEffect } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import Spinner from "@/components/shared/Spinner";
import Image from "next/image";

export default function CartPage() {
  const { carts, fetchAllCarts, isLoading, error } = useCartStore();

  useEffect(() => {
    if (carts === null) {
      fetchAllCarts();
    }
  }, [fetchAllCarts, carts]);

  const subtotal =
    carts?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ??
    0;

  if (isLoading) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        <Spinner />
        <span>Loading cart...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Heading */}
        <h1 className="mb-6 text-lg font-semibold">
          My Cart ({carts?.length ?? 0})
        </h1>

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {/* Header */}
        <div className="grid grid-cols-2 gap-4 border-b pb-4 text-sm font-medium md:grid-cols-[2fr_1fr_1fr_1fr]">
          <span>Product</span>
          <span className="text-right md:text-left">Price</span>
          <span className="hidden md:block">Quantity</span>
          <span className="hidden md:block text-right">Total</span>
        </div>

        {/* Items */}
        <div className="border-b border-t">
          {carts?.map((item) => {
            const price = item.product.price;
            const total = price * item.quantity;

            return (
              <div
                key={item._id}
                className="grid grid-cols-2 gap-4 py-6 md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center"
              >
                {/* Product */}
                <div className="col-span-2 flex gap-4 md:col-span-1">
                  <Image
                    
                    width={250}
                    height={200}
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="max-h-24 max-w-20 md:max-w-full md:max-h-full rounded-md border object-cover"
                  />

                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Size: Small</p>

                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs text-muted-foreground"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <p className="text-sm text-right  font-medium">
                  Rs.{price.toLocaleString()}
                </p>

                {/* Quantity */}
                <div className="flex w-fit items-center gap-3 rounded-md border px-3 py-2">
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className="text-sm font-medium">{item.quantity}</span>

                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Total */}
                <p className="text-sm font-semibold hidden md:block text-right md:text-right">
                  Rs.{total.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {!isLoading && carts?.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Your cart is empty
          </p>
        )}

        {/* Subtotal + Checkout */}
        {carts?.length > 0 && (
          <div className="mt-12 flex justify-end">
            <div className="w-full max-w-sm space-y-4">
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout
                </p>
              </div>

              <Button className="w-full rounded-md py-6 text-sm font-semibold">
                CHECK OUT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
