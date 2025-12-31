"use client";

import FiltersPanel from "@/components/product_comps/FiltersPanel";
import MobileHeader from "@/components/product_comps/MobileHeader";
import ProductCard from "@/components/product_comps/ProductCard";
import SearchBar from "@/components/product_comps/SearchBar";
import SortMenu from "@/components/product_comps/SortMenu";
import { useCartStore } from "@/store/cartStore";

import { useProductStore } from "@/store/productStore";
import { BrandDTO, CategoryDTO } from "@/types/productType";

import { useState, useMemo, useEffect } from "react";

const PRICE_MAX = 20000;

const Page = () => {
  // ===================== STATE =====================
  const [cart, setCart] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    PRICE_MAX,
  ]);

  const [selectedBrands, setSelectedBrands] = useState<BrandDTO[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryDTO[]>(
    []
  );
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [sortOption, setSortOption] = useState<string>("relevant");
  const [search, setSearch] = useState("");

  // ===================== STORE =====================
  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    if (!products) {
      fetchAllProducts();
    }
  }, [fetchAllProducts, products]);

  // ===================== DERIVED FILTER DATA =====================
  const brands = useMemo<BrandDTO[]>(() => {
    if (!products) return [];
    return Array.from(
      new Map(products.map((p) => [p.brand._id, p.brand])).values()
    );
  }, [products]);

  const categories = useMemo<CategoryDTO[]>(() => {
    if (!products) return [];
    return Array.from(
      new Map(products.map((p) => [p.category._id, p.category])).values()
    );
  }, [products]);

  const genders = ["Male", "Female", "Both"];

  // ===================== FILTER + SORT =====================
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const results = products
      .filter((p) => {
        const matchesPrice =
          p.price >= priceRange[0] && p.price <= priceRange[1];

        const matchesBrands =
          selectedBrands.length === 0 ||
          selectedBrands.some((b) => b._id === p.brand._id);

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((c) => c._id === p.category._id);

        const matchesGender =
          selectedGender.length === 0 || selectedGender.includes(p.gender);

        const matchesRating =
          selectedRating === null || p.rating >= selectedRating;

        const matchesSearch =
          !search ||
          p.slug.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.name.toLowerCase().includes(search.toLowerCase());

        return (
          matchesPrice &&
          matchesBrands &&
          matchesCategory &&
          matchesGender &&
          matchesRating &&
          matchesSearch
        );
      })
      .slice(); // prevent mutation

    switch (sortOption) {
      case "lowToHigh":
        results.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        results.sort((a, b) => b.price - a.price);
        break;
      case "ratingLow":
        results.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingHigh":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        results.sort((a, b) => b.sold - a.sold);
        break;
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return results;
  }, [
    products,
    priceRange,
    selectedBrands,
    selectedCategories,
    selectedGender,
    selectedRating,
    sortOption,
    search,
  ]);

  // ===================== ACTIONS =====================

  const { addToCart, isLoading, error, success } = useCartStore();

  const handleAddToCart = async (id: string) => {
    await addToCart(id);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedGender([]);
    setSelectedRating(null);
    setPriceRange([0, PRICE_MAX]);
    setSearch("");
  };

  // ===================== RENDER =====================
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
        {/* SIDEBAR */}
        <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 flex-col bg-muted/40 border-r border-border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>

          <FiltersPanel
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            genders={genders}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            resetFilters={resetFilters}
          />
        </aside>

        {/* MOBILE HEADER */}
        <MobileHeader
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          brands={brands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          genders={genders}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          resetFilters={resetFilters}
          setSortOption={setSortOption}
        />

        {/* MAIN */}
        <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <SearchBar search={search} setSearch={setSearch} />
            <div className="hidden md:block">
              <SortMenu setSortOption={setSortOption} />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">
              No products match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  isLoading={isLoading}
                  key={product._id}
                  product={product}
                  cart={cart}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Page;
