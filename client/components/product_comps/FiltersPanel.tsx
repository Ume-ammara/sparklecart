"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { BrandDTO, CategoryDTO } from "@/types/productType";

interface FiltersPanelProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  brands: BrandDTO[];
  selectedBrands: BrandDTO[];
  setSelectedBrands: (value: BrandDTO[]) => void;
  categories: CategoryDTO[];
  selectedCategories: CategoryDTO[];
  setSelectedCategories: (value: CategoryDTO[]) => void;
  genders: string[];
  selectedGender: string[];
  setSelectedGender: (value: string[]) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  resetFilters: () => void;
}

const FiltersPanel = ({
  priceRange,
  setPriceRange,
  brands,
  selectedBrands,
  setSelectedBrands,
  categories,
  selectedCategories,
  setSelectedCategories,
  genders,
  selectedGender,
  setSelectedGender,
  selectedRating,
  setSelectedRating,
  resetFilters,
}: FiltersPanelProps) => {
  console.log("CATEGORIES ITEMS : ", categories);
  return (
    <div className="space-y-8 px-4 py-6 text-sm overflow-y-auto max-h-[calc(100vh-64px)]">
      {/* PRICE */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Price Range</Label>
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(v: number[]) => setPriceRange(v as [number, number])}
          min={0}
          max={20000}
          step={50}
        />
      </div>

      <Separator />

      {/* BRANDS FILTER */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Company</Label>
        <div className="flex flex-wrap gap-2">
          {brands?.map((brand) => (
            <Button
              key={typeof brand === "string" ? brand : brand._id}
              variant={
                selectedBrands.some(
                  (b) => typeof b !== "string" && b._id === brand._id
                )
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setSelectedBrands(
                  selectedBrands.some(
                    (b) => typeof b !== "string" && b._id === brand._id
                  )
                    ? selectedBrands.filter(
                        (b) => typeof b !== "string" && b._id !== brand._id
                      )
                    : [...selectedBrands, brand]
                )
              }
            >
              {typeof brand === "string" ? brand : brand.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* CATEGORY */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Category</Label>
        <div className="flex flex-wrap gap-2">
          {categories?.map(
            (category) =>
              category && (
                <Button
                  key={category._id}
                  variant={
                    selectedCategories.some((c) => c._id === category._id)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() =>
                    setSelectedCategories(
                      selectedCategories.some((c) => c._id === category._id)
                        ? selectedCategories.filter(
                            (c) => c._id !== category._id
                          )
                        : [...selectedCategories, category]
                    )
                  }
                >
                  {category.name}
                </Button>
              )
          )}
        </div>
      </div>

      <Separator />

      {/* GENDER */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Gender</Label>
        <div className="flex flex-wrap gap-2">
          {genders.map((g) => (
            <Button
              key={g}
              variant={selectedGender.includes(g) ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setSelectedGender(
                  selectedGender.includes(g)
                    ? selectedGender.filter((c) => c !== g)
                    : [...selectedGender, g]
                )
              }
            >
              {g}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* RATING */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Minimum Rating</Label>
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3].map((r) => (
            <Button
              key={r}
              variant={selectedRating === r ? "default" : "outline"}
              size="sm"
              className={`rounded-full text-xs ${
                selectedRating === r ? "bg-yellow-500 text-black" : ""
              }`}
              onClick={() => setSelectedRating(selectedRating === r ? null : r)}
            >
              <Star className="h-3 w-3 fill-current" /> {r}+
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <Button
        variant="secondary"
        size="sm"
        onClick={resetFilters}
        className="w-full mt-2"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FiltersPanel;
