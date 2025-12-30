"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import ProductForm from "@/components/product_comps/ProductForm";
import Spinner from "@/components/shared/Spinner";
import { useSellerStore } from "@/store/sellerStore";
import { ProductFormDTO } from "@/schemas/productSchema";

export default function UpdateProductPage() {
  const { productId } = useParams<{ productId: string }>();

  const { sellerProduct, fetchSellerProductById, updateProduct, isLoading } =
    useSellerStore();

  useEffect(() => {
    if (productId) {
      fetchSellerProductById(productId);
    }
  }, [productId, fetchSellerProductById]);

  const defaultValues: ProductFormDTO | null = useMemo(() => {
    if (!sellerProduct) return null;

    return {
      name: sellerProduct.name,
      slug: sellerProduct.slug,
      description: sellerProduct.description,
      price: sellerProduct.price,
      quantity: sellerProduct.quantity,
      category: sellerProduct.category.name,
      images: [],
      brand: {
        slug: sellerProduct.brand.slug,
        name: sellerProduct.brand.name,
        country: sellerProduct.brand.country,
        description: sellerProduct.brand.description,
      },
    };
  }, [sellerProduct]);

  if (isLoading || !sellerProduct || !defaultValues) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductForm
        mode="update"
        defaultValues={defaultValues}
        existingImages={sellerProduct.images}
        onSubmit={(data) => updateProduct(productId, data)}
      />
    </div>
  );
}
