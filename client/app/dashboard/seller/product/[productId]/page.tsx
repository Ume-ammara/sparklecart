"use client";

import { useParams } from "next/navigation";

const UpdateProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return <div>{productId}</div>;
};

export default UpdateProductPage;
