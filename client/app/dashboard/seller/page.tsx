"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, PlusCircle, Trash, Trash2 } from "lucide-react";

import SellerProductTable from "@/components/seller_comps/SellerProductTable";
import SellerProductCard from "@/components/seller_comps/SellerProductCard";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useSellerStore } from "@/store/sellerStore";
import ActionButton from "@/components/shared/ActionButton";

type ViewType = "table" | "card";

const SellerDashboardPage = () => {
  const { sellerProducts, fetchSellerProducts, isLoading } = useSellerStore();
  const [view, setView] = useState<ViewType>("table");

  useEffect(() => {
    if (sellerProducts === null) {
      fetchSellerProducts();
    }
  }, [sellerProducts, fetchSellerProducts]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2">
        <Spinner />
        <p className="text-sm text-muted-foreground">Loading products…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your products and inventory
            </p>
          </div>

          {/* PRIMARY ACTION */}
          <Link href="/dashboard/seller/product">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Product
            </Button>
          </Link>
        </header>

        {/* VIEW TOGGLE */}
        <section className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Products</h2>

          <div className="flex items-center gap-1 rounded-md border border-border bg-muted p-1">
            <Button
              size="sm"
              variant={view === "table" ? "secondary" : "ghost"}
              onClick={() => setView("table")}
            >
              <List className="h-4 w-4 mr-1" />
              Table
            </Button>

            <Button
              size="sm"
              variant={view === "card" ? "secondary" : "ghost"}
              onClick={() => setView("card")}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Cards
            </Button>
          </div>
        </section>

        {/* CONTENT */}
        <section>
          {view === "table" && <SellerProductTable />}

          {view === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {sellerProducts?.map((product) => (
                <SellerProductCard
                  key={product._id}
                  product={{
                    ...product,
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SellerDashboardPage;
