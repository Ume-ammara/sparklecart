import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSellerStore } from "@/store/sellerStore";

const SellerProductTable = () => {
  const { sellerProducts } = useSellerStore();

  if (!sellerProducts || sellerProducts.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No products found</div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-5 bg-muted px-4 py-3 text-sm font-medium">
        <span>Product</span>
        <span>Price</span>
        <span>Status</span>
        <span>Stock</span>
        <span>Actions</span>
      </div>

      {sellerProducts.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-5 items-center px-4 py-3 text-sm border-t"
        >
          <span>{product.name}</span>
          <span>${product.price}</span>
          <span className="text-green-600">Active</span>
          <span>{product.quantity}</span>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerProductTable;
