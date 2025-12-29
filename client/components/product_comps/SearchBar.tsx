"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(search);

  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  const handleClear = () => {
    setLocalValue("");
    setSearch("");
  };

  const handleSearch = () => {
    setSearch(localValue.trim());
  };

  return (
    <div className="relative w-full sm:w-80">
      <Input
        type="text"
        placeholder="Search products..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="pl-10 pr-10 rounded-md"
      />

      <div
        onClick={handleSearch}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-md cursor-pointer hover:border hover:border-border transition"
      >
        <Search className="w-4 h-4 text-muted-foreground hover:text-foreground" />
      </div>

      {localValue && (
        <div
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-md cursor-pointer hover:border hover:border-border transition"
        >
          <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
