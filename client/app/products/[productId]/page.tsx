"use client";

import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const { productId } = useParams();
  return <div>{productId}</div>;
};

export default ProductDetailPage;
