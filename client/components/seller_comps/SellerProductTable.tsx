"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useSellerStore } from "@/store/sellerStore";
import ActionButton from "../shared/ActionButton";
import { useState } from "react";

const SellerProductTable = () => {
  const { sellerProducts } = useSellerStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  if (!sellerProducts || sellerProducts.length === 0) {
    return (
      <div className="rounded-md border border-border bg-card p-6 text-sm text-muted-foreground">
        No products found
      </div>
    );
  }

  const { deleteProduct } = useSellerStore();

  const handleDeleteProductById = async () => {
    if (!selectedProductId) return;
    await deleteProduct(selectedProductId);
    setOpenDelete(false);
    setSelectedProductId(null);
  };

  return (
    <>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sellerProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>

                <TableCell>₹{product.price.toLocaleString("en-IN")}</TableCell>

                <TableCell>
                  <Badge
                    variant={product.quantity > 0 ? "default" : "destructive"}
                  >
                    {product.quantity > 0 ? "Active" : "Out of stock"}
                  </Badge>
                </TableCell>

                <TableCell>{product.quantity}</TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex gap-1">
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedProductId(product._id);
                        setOpenDelete(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {
        <ActionButton
          title="Delete this product"
          description="This action cannot be undone."
          cancelLabel="Cancel"
          confirmLabel="Delete"
          open={openDelete}
          action={handleDeleteProductById}
          onOpenChange={setOpenDelete}
        />
      }
    </>
  );
};

export default SellerProductTable;
