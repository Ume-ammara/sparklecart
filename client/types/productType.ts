import { UserDTO } from "./userType";

export interface ProductDTO {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string | CategoryDTO;
  quantity: number;
  images: string[];
  seller: string | UserDTO;
  inStock: boolean;
  brand: string | BrandDTO;
  createdAt: string;
}

export interface CategoryDTO {
  _id: string;
}

export interface BrandDTO {
  _id: string;
}
