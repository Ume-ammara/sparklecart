"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import { useCartStore } from "@/store/cartStore";

interface CartListProps {
  item: {
    _id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
      images: string[];
    };
  };
}

const FALLBACK_IMAGE = "/placeholder-product.png"; // put this in /public

const CartList = ({ item }: CartListProps) => {
  const price = item.product.price;
  const total = price * item.quantity;

  const [openRemoveCart, setOpenRemoveCart] = useState(false);

  const { removeFromCart, updateCartQuantity, isLoading } = useCartStore();

  // ✅ ALWAYS resolve to a valid string
  const productImage =
    item.product.images && item.product.images.length > 0
      ? item.product.images[0]
      : FALLBACK_IMAGE;

  /* ================= REMOVE ================= */
  const handleRemoveCart = async () => {
    await removeFromCart(item._id);
    setOpenRemoveCart(false);
  };

  /* ================= DECREASE ================= */
  const handleDecrease = async () => {
    if (item.quantity === 1) {
      setOpenRemoveCart(true);
      return;
    }
    await updateCartQuantity(item._id, item.quantity - 1);
  };

  /* ================= INCREASE ================= */
  const handleIncrease = async () => {
    await updateCartQuantity(item._id, item.quantity + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border py-4 px-2 md:flex-row md:items-center">
        {/* LEFT: PRODUCT */}
        <div className="flex flex-1 gap-4">
          <div className="relative h-24 w-20 overflow-hidden rounded-md border bg-muted">
            {/* ✅ SAFE IMAGE RENDER */}
            <Image
              src={productImage}
              alt={item.product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold leading-tight">
                {item.product.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Price: Rs.{price?.toLocaleString()}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-fit px-0 text-xs text-destructive hover:bg-transparent cursor-pointer"
              onClick={() => setOpenRemoveCart(true)}
              disabled={isLoading}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Remove
            </Button>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center justify-between gap-4 md:w-70 md:justify-end">
          {/* QUANTITY */}
          <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 cursor-pointer"
              onClick={handleDecrease}
              disabled={isLoading}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="min-w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 cursor-pointer"
              onClick={handleIncrease}
              disabled={isLoading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* TOTAL */}
          <p className="min-w-22.5 text-right text-sm font-semibold">
            Rs.{total?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* REMOVE CONFIRMATION */}
      <ActionButton
        open={openRemoveCart}
        onOpenChange={setOpenRemoveCart}
        title="Remove From Cart"
        description="Are you sure you want to remove this item from your cart?"
        confirmLabel="Remove"
        cancelLabel="Cancel"
        action={handleRemoveCart}
        isLoading={isLoading}
      />
    </>
  );
};

export default CartList;
