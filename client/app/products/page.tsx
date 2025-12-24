"use client";

import { useEffect } from "react";

import { useProductStore } from "@/store/productStore";

const Page = () => {
  const { products, fetchAllProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    if (products === null) {
      (async () => {
        fetchAllProducts();
      })();
    }
  }, [products, fetchAllProducts]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      {/* SIDEBAR */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 flex-col bg-muted/40 border-r border-border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className=" md:block">{"Fetch Response"}</div>
        </div>
      </main>
    </div>
  );
};

export default Page;
