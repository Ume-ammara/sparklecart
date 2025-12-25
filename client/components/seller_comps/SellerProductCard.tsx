import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SellerProductCard = () => {
  return (
    <Card className="w-[240px] rounded-2xl ml-6 shadow-md overflow-hidden">
      {/* Image */}
      <div className="w-full h-[180px]">
        <img
          src="https://plus.unsplash.com/premium_photo-1682582245151-aa44d698771f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvb2RlbiUyMGNoYWlyfGVufDB8fDB8fHww"
          alt="Product"
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Content */}
      <CardContent className="px-4 flex flex-col  flex-wrap  pb-2">
        <h3 className="font-bold text-sm">Elegant Wood Chair</h3>
        <p className="text-xs text-gray-500 mt-2">SKU: 7394873JKJ</p>

        <div className="flex items-center gap-6 mt-2">
          <span className="text-xs text-gray-500">Stock: 12</span>
          <span className="text-xs  px-2 py-0.5 rounded-md mt-1  bg-green-100 text-green-700">
            Active
          </span>
        </div>

        <p className="font-semibold text-sm mt-1">$41.32</p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button className="flex-1" variant="outline">
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button className="flex-1" variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerProductCard;
