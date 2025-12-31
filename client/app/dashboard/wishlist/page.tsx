"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeartOff, ShoppingCart } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

// Simulated fetch function (replace with real API)
const fetchWishlist = async (): Promise<WishlistItem[]> => {
  // Example API call
  // const res = await axios.get("/api/wishlist");
  // return res.data.wishlist.products;

  return [
    {
      _id: "1",
      name: "Wireless Headphones",
      price: 5999,
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    },
    {
      _id: "2",
      name: "Smart Watch",
      price: 8999,
      images: [],
    },
  ];
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist()
      .then((data) => setWishlist(data))
      .finally(() => setLoading(false));
  }, []);

  // Remove item from wishlist
  const removeItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
    // TODO: call API to remove from backend
  };

  // Move to cart (for now just remove from wishlist)
  const moveToCart = (id: string) => {
    // TODO: call API to add to cart
    removeItem(id);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!wishlist.length)
    return <p className="text-center mt-10">Your wishlist is empty</p>;

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 md:m-10 md:ml-15 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((item) => (
        <Card key={item._id} className="group w-60 overflow-hidden">
          <CardContent className="p-4 space-y-3">
            {/* Image */}
            <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
              <Image
                src={
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : "/placeholder.png"
                }
                alt={item.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {/* Remove from Wishlist */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => removeItem(item._id)}
              >
                <HeartOff className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-tight line-clamp-2">
                {item.name}
              </h3>
              <p className="text-base font-semibold">${item.price}</p>
            </div>
          </CardContent>

          {/* Actions */}
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full gap-2"
              onClick={() => moveToCart(item._id)}
            >
              <ShoppingCart className="w-4 h-4" />
              Move to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
