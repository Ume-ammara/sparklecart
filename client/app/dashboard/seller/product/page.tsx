import ProductForm from "@/components/product_comps/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center relative">
      <ProductForm />
      <Button className="fixed cursor-pointer top-10 left-20">
        <Link href="/dashboard/seller" className="flex gap-2 items-center">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back</span>
        </Link>
      </Button>
    </div>
  );
};

export default page;
