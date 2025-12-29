"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import SortMenu from "./SortMenu";
import FiltersPanel from "../product_comps/FiltersPanel";

const MobileHeader = (props: any) => {
  return (
    <div className="md:hidden flex justify-between items-center px-4 py-3 border-b sticky top-0 bg-background z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <FiltersPanel {...props} />
          </div>
        </SheetContent>
      </Sheet>

      <SortMenu setSortOption={props.setSortOption} />
    </div>
  );
};

export default MobileHeader;
