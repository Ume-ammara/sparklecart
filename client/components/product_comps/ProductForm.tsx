"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "../shared/Spinner";
import { productSchema, ProductFormDTO } from "@/schemas/productSchema";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ProductFormDTO>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormDTO) => {
    console.log("PRODUCT FORM DATA:", data);
    // send data to backend
  };

  return (
    <Card className="w-full max-w-7xl overflow-hidden p-0 shadow-lg bg-card    ">
      <CardContent className="p-6 md:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap gap-6"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">
              Fill in the details to create a new product
            </p>
          </div>

          {/* Slug */}
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="product-slug" {...register("slug")} />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Product Name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Product description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              step="0.01"
              id="price"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              placeholder="0"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="category"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Images */}
          <div className="grid gap-2">
            <Label htmlFor="images">Images (comma separated URLs)</Label>
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <Input
                  id="images"
                  placeholder="https://image1.com, https://image2.com"
                  value={field.value?.join(",") || ""}
                  onChange={(e) => field.onChange(e.target.value.split(","))}
                />
              )}
            />
            {errors.images && (
              <p className="text-sm text-destructive">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Brand */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-semibold mb-2">Brand Info</legend>

            <div className="grid gap-2">
              <Label htmlFor="brandSlug">Brand Slug</Label>
              <Input
                id="brandSlug"
                placeholder="brand-slug"
                {...register("brand.slug")}
              />
              {errors.brand?.slug && (
                <p className="text-sm text-destructive">
                  {errors.brand.slug.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                placeholder="Brand Name"
                {...register("brand.name")}
              />
              {errors.brand?.name && (
                <p className="text-sm text-destructive">
                  {errors.brand.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brandDescription">Brand Description</Label>
              <Input
                id="brandDescription"
                placeholder="Brand Description"
                {...register("brand.description")}
              />
              {errors.brand?.description && (
                <p className="text-sm text-destructive">
                  {errors.brand.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brandCountry">Brand Country</Label>
              <Input
                id="brandCountry"
                placeholder="Brand Country"
                {...register("brand.country")}
              />
              {errors.brand?.country && (
                <p className="text-sm text-destructive">
                  {errors.brand.country.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? <Spinner /> : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
