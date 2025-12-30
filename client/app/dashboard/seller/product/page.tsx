"use client";

import ProductForm from "@/components/product_comps/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useSellerStore } from "@/store/sellerStore";

export default function CreateProductPage() {
  const { createProduct, isLoading } = useSellerStore();

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/seller" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>

          <h1 className="text-lg font-semibold">Create Product</h1>
        </div>
      </div>

      {/* FORM */}
      <ProductForm mode="create" onSubmit={createProduct} />
    </div>
  );
}
