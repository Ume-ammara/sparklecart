"use client";

import ProfileCard from "@/components/user_comps/ProfileCard";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import BecomeASeller from "@/components/seller_comps/BecomeASeller";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Package,
  Wallet,
  ShoppingCart,
  Heart,
  Store,
  Settings,
  HelpCircle,
  Star,
  MapPin,
  CreditCard,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const shortcuts = [
  { label: "My Orders", icon: Package, href: "/dashboard/order" },
  { label: "Transactions", icon: Wallet, href: "/dashboard/transactions" },
  { label: "Cart", icon: ShoppingCart, href: "/dashboard/cart" },
  { label: "Saved", icon: Heart, href: "/dashboard/wishlist" },
];

const additionalActions = [
  { label: "Sell on SparkleCart", icon: Store, href: "/dashboard/seller" },
  { label: "Your Reviews", icon: Star, href: "/reviews" },
  { label: "Saved Address", icon: MapPin, href: "/addresses" },
  { label: "Payment Methods", icon: CreditCard, href: "/payments" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/help" },
  { label: "Terms & Conditions", icon: ShieldCheck, href: "/terms" },
];

const Page = () => {
  const router = useRouter();
  const { user, isLoading, error } = useAuthStore();

  const [openSellerForm, setOpenSellerForm] = useState(false);

  const { carts, fetchAllCarts } = useCartStore();

  // Redirect if refresh token expired
  useEffect(() => {
    if (error === "Refresh token expired please login") {
      router.replace("/auth/login");
    }
  }, [error, router]);

  useEffect(() => {
    if (carts === null) {
      fetchAllCarts();
    }
  }, [fetchAllCarts, carts]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <Spinner />
        <p className="text-sm text-muted-foreground">
          Fetching your profile data...
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <ProfileCard {...user} />

          {/* SHORTCUTS */}
          <section className="mt-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {shortcuts.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-24 flex-col items-center justify-center gap-2"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ACTIONS */}
          <section className="mt-10 border-t pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {additionalActions.map(({ label, icon: Icon, href }) => {
                const isSellAction = label === "Sell on SparkleCart";

                return (
                  <Button
                    key={label}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      if (isSellAction && user.role !== "seller") {
                        setOpenSellerForm(true);
                      } else {
                        router.push(href);
                      }
                    }}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{label}</span>
                  </Button>
                );
              })}
            </div>
          </section>

          {/* LOGOUT */}
          <section className="mt-10 border-t pt-6">
            <Button
              variant="outline"
              className="w-full justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => {
                console.log("User Logged Out");
                // logout logic here
              }}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </section>
        </div>
      </main>

      {/* SELLER MODAL */}
      <BecomeASeller
        open={openSellerForm}
        onClose={() => setOpenSellerForm(false)}
      />
    </>
  );
};

export default Page;
