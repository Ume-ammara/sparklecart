"use client";

import ProductForm from "@/components/product_comps/ProductForm";
import SellerProductTable from "@/components/seller_comps/SellerProductTable";
import ActionCard from "@/components/shared/ActionCard";
import Spinner from "@/components/shared/Spinner";
import { useSellerStore } from "@/store/sellerStore";

import { PlusCircle, Package, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SellerDashboardPage = () => {
  const { sellerProducts, fetchSellerProducts, isLoading } = useSellerStore();

  useEffect(() => {
    if (sellerProducts === null) {
      fetchSellerProducts();
    }
  }, [sellerProducts, fetchSellerProducts]);

  console.log("SELLER PRODUCTS : ", sellerProducts);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your products and inventory
          </p>
        </div>

        {/* Quick Actions */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={"/dashboard/seller/product"}>
            <ActionCard
              title="Create Product"
              description="Add a new product to your store"
              icon={PlusCircle}
            />
          </Link>

          <ActionCard
            title="View Products"
            description="See all products you created"
            icon={Package}
          />

          <ActionCard
            title="Update Product"
            description="Edit product details and pricing"
            icon={Pencil}
          />

          <ActionCard
            title="Delete Product"
            description="Remove products from your store"
            icon={Trash2}
          />
        </section>

        {/* Product List */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Products</h2>
          <SellerProductTable />
        </section>
      </div>
    </main>
  );
};

export default SellerDashboardPage;
