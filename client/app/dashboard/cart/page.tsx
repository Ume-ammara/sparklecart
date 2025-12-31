"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import Spinner from "@/components/shared/Spinner";
import CartList from "@/components/cart_comps/CartList";
import { Trash2 } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";

const CartPage = () => {
  const [openClearCart, setOpenClearCart] = useState(false);

  const { carts, fetchAllCarts, clearAllCart, isLoading, error } =
    useCartStore();

  useEffect(() => {
    if (carts === null) {
      fetchAllCarts();
    }
  }, [fetchAllCarts, carts]);

  const subtotal =
    carts?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ??
    0;

  const handleClearCart = async () => {
    if (!carts?.length) return;
    await clearAllCart();
    setOpenClearCart(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2">
        <Spinner />
        <span className="text-sm text-muted-foreground">Loading cart…</span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              My Cart{" "}
              <span className="text-sm text-muted-foreground">
                ({carts?.length ?? 0})
              </span>
            </h1>

            {carts?.length ? (
              <Button
                variant="ghost"
                className="gap-2 text-destructive hover:bg-destructive/10"
                onClick={() => setOpenClearCart(true)}
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </Button>
            ) : null}
          </div>

          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {/* CART ITEMS */}
          {carts?.length ? (
            <div className="rounded-lg border border-border bg-card">
              {carts.map((item) => (
                <CartList key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-sm text-muted-foreground">
              Your cart is empty
            </p>
          )}

          {/* SUMMARY */}
          {carts?.length && carts.length > 0 && (
            <div className="mt-10 flex justify-end">
              <div className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout
                </p>

                <Button className="w-full py-6 text-sm font-semibold">
                  CHECK OUT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {
        <ActionButton
          open={openClearCart}
          onOpenChange={setOpenClearCart}
          title="Clear All Of Your Cart Items"
          description="Are you sure you want to clear your cart?"
          confirmLabel="Clear"
          cancelLabel="Cancel"
          action={handleClearCart}
          isLoading={isLoading}
        />
      }
    </>
  );
};

export default CartPage;
