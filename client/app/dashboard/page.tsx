"use client";

import ProfileCard from "@/components/user_comps/ProfileCard";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
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

const shortcuts = [
  { label: "My Orders", icon: Package },
  { label: "Transactions", icon: Wallet },
  { label: "Cart", icon: ShoppingCart },
  { label: "Saved", icon: Heart },
];

const additionalActions = [
  { label: "Sell on SparkleCart", icon: Store },
  { label: "Your Reviews", icon: Star },
  { label: "Saved Address", icon: MapPin },
  { label: "Payment Methods", icon: CreditCard },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: HelpCircle },
  { label: "Terms & Conditions", icon: ShieldCheck },
];

const Page = () => {
  const router = useRouter();
  const { user, isLoading, error } = useAuthStore();

  // If refresh token expired then redirect to login page
  useEffect(() => {
    if (error === "Refresh token expired please login") {
      router.replace("/auth/login");
    }
  }, [error, router]);

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
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <ProfileCard {...user} />

        {/* Shortcuts */}
        <section className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {shortcuts.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-2"
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="mt-10 border-t pt-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {additionalActions.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{label}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <section className="mt-10 border-t pt-6">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => {
              console.log("User Logged Out");
            }}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </section>
      </div>
    </main>
  );
};

export default Page;
