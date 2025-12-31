"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

interface QuantityToggleProps {
  quantity: number;
  onIncrease: () => Promise<void> | void;
  onDecrease: () => Promise<void> | void;
  isLoading?: boolean;
  min?: number;
}

const QuantityToggle = ({
  quantity,
  onIncrease,
  onDecrease,
  isLoading = false,
  min = 1,
}: QuantityToggleProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1 bg-background">
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 cursor-pointer"
        disabled={isLoading || quantity <= min}
        onClick={onDecrease}
      >
        {isLoading ? <Spinner /> : <Minus className="h-3 w-3" />}
      </Button>

      <span className="min-w-6 text-center text-sm font-medium">
        {quantity}
      </span>

      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 cursor-pointer"
        disabled={isLoading}
        onClick={onIncrease}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuantityToggle;
