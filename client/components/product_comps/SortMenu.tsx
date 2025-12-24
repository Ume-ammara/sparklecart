"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SortMenu = ({
  setSortOption,
}: {
  setSortOption: (v: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" /> Sort
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Price</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setSortOption("lowToHigh")}>
              Low → High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("highToLow")}>
              High → Low
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Rating</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setSortOption("ratingHigh")}>
              High → Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("ratingLow")}>
              Low → High
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setSortOption("popular")}>
          Popular
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("newest")}>
          Newest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("relevant")}>
          Relevant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortMenu;
