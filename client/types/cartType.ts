import { ProductDTO } from "./productType";

export interface CartDTO {
  _id: string;
  title: string;
  product: ProductDTO;
  quantity: number;
  isPurchased: boolean;
  createdAt: string;
  updatedAt: string;
}
