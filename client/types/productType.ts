export interface BrandDTO {
  _id: string;
  slug: string;
  name: string;
  description: string;
  country: string;
}

export interface CategoryDTO {
  _id: string;
  name: string;
}

export interface ProductDTO {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  rating: number;
  sold: number;
  gender: string;
  dateAdded: string;
  brand: BrandDTO;
  category: CategoryDTO;
  createdAt: string | number | Date;
}
