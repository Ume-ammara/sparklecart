"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "../shared/Spinner";
import { productSchema, ProductFormDTO } from "@/schemas/productSchema";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormDTO>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
    },
  });

  const images = useWatch({ control, name: "images" });

  const previewUrls = useMemo(() => {
    if (!images?.length) return [];
    return images.map((file) => URL.createObjectURL(file));
  }, [images]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const onSubmit = async (data: ProductFormDTO) => {
    console.log("PRODUCT FORM DATA:", data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-lg font-semibold">Add New Product</h1>
        </div>
      </header>

      {/* CONTENT */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-7xl px-6 py-6 space-y-6"
      >
        {/* PRODUCT DETAILS */}
        <section className="bg-card border border-border rounded-sm">
          <div className="border-b border-border px-4 py-3 font-medium">
            Product Details
          </div>

          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="col-span-2 space-y-1">
              <Label className="text-sm">Name</Label>
              <Input {...register("name")} />
            </div>

            <div className="col-span-2 space-y-1">
              <Label className="text-sm">Slug</Label>
              <Input {...register("slug")} />
              {errors.slug && (
                <p className="text-xs text-destructive">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div className="col-span-4 space-y-1">
              <Label className="text-sm">Description</Label>
              <Input {...register("description")} />
            </div>

            <div className="col-span-2 space-y-1">
              <Label className="text-sm">Category</Label>
              <Input {...register("category")} />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-card border border-border rounded-sm">
          <div className="border-b border-border px-4 py-3 font-medium">
            Pricing & Inventory
          </div>

          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-1">
              <Label className="text-sm">Price</Label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
              />
            </div>

            <div className="col-span-1 space-y-1">
              <Label className="text-sm">Quantity</Label>
              <Input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />
            </div>
          </div>
        </section>

        {/* IMAGES */}
        <section className="bg-card border border-border rounded-sm">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <span className="font-medium">Product Images</span>

            {!!images?.length && (
              <span className="text-xs text-muted-foreground">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </span>
            )}
          </div>

          <div className="p-4 grid grid-cols-12 gap-4">
            {/* UPLOAD */}
            <div className="col-span-4">
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-border bg-muted text-sm hover:bg-muted/80">
                    <span className="font-medium">Upload Images</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG only
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files || []))
                      }
                    />
                  </label>
                )}
              />
            </div>

            {/* PREVIEW */}
            <div className="col-span-8">
              {previewUrls.length ? (
                <div className="grid grid-cols-4 gap-3">
                  {previewUrls.map((src, index) => (
                    <div
                      key={src}
                      className="relative h-24 w-full overflow-hidden rounded-sm border border-border bg-muted"
                    >
                      <Image
                        src={src}
                        alt={`product-${index}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized
                      />

                      <span className="absolute bottom-1 right-1 rounded bg-background/80 px-1 text-[10px] text-foreground">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center border border-dashed border-border text-sm text-muted-foreground">
                  No images uploaded
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BRAND */}
        <section className="bg-card border border-border rounded-sm">
          <div className="border-b border-border px-4 py-3 font-medium">
            Brand
          </div>

          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-1">
              <Label className="text-sm">Brand Slug</Label>
              <Input {...register("brand.slug")} />
            </div>

            <div className="col-span-1 space-y-1">
              <Label className="text-sm">Brand Name</Label>
              <Input {...register("brand.name")} />
            </div>

            <div className="col-span-1 space-y-1">
              <Label className="text-sm">Country</Label>
              <Input {...register("brand.country")} />
            </div>

            <div className="col-span-4 space-y-1">
              <Label className="text-sm">Brand Description</Label>
              <Input {...register("brand.description")} />
            </div>
          </div>
        </section>

        {/* ACTION BAR */}
        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
