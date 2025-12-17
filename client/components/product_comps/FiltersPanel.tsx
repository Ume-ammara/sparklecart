"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface FiltersPanelProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  companies: string[];
  selectedCompanies: string[];
  setSelectedCompanies: (value: string[]) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
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
  companies,
  selectedCompanies,
  setSelectedCompanies,
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
          max={2000}
          step={50}
        />
      </div>

      <Separator />

      {/* COMPANY */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Company</Label>
        <div className="flex flex-wrap gap-2">
          {companies.map((company) => (
            <Button
              key={company}
              variant={
                selectedCompanies.includes(company) ? "default" : "outline"
              }
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setSelectedCompanies(
                  selectedCompanies.includes(company)
                    ? selectedCompanies.filter((c) => c !== company)
                    : [...selectedCompanies, company]
                )
              }
            >
              {company}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* CATEGORY */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Category</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setSelectedCategories(
                  selectedCategories.includes(category)
                    ? selectedCategories.filter((c) => c !== category)
                    : [...selectedCategories, category]
                )
              }
            >
              {category}
            </Button>
          ))}
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
