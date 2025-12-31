"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import ProfileDropdown from "../user_comps/ProfileDropdown";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "On Sale", href: "#" },
  { label: "New Arrivals", href: "#" },
  { label: "Brands", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { carts } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  console.log("CARTS LENGTH", carts);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="text-xl font-bold">
            SPARCLE CART
          </Link>
        </div>

        {/* Center (Desktop Nav) */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              className="h-10 w-64 rounded-full border border-border bg-muted pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden"
            aria-label="Search"
            onClick={() => setMobileSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </button>

          <Button
            asChild
            size="icon"
            variant="ghost"
            className="relative rounded-full"
          >
            <Link href="/dashboard/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {carts?.length ?? 0}
              </span>
            </Link>
          </Button>

          {/* <Button size="icon" variant="ghost" aria-label="Account">
            <Link href={"/dashboard"}>
              <User className="h-5 w-5" />
            </Link>
          </Button> */}

          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Button asChild variant="ghost">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              className="h-10 w-full rounded-full border border-border bg-muted pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="text-lg font-bold">SPARCLE CART</span>
            <button onClick={() => setMobileOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
