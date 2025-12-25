import { ProductFormDTO } from "@/schemas/productSchema";

export const toFormData = (data: ProductFormDTO) => {
  const fd = new FormData();

  fd.append("slug", data.slug);
  fd.append("name", data.name);
  fd.append("description", data.description);
  fd.append("price", String(data.price));
  fd.append("quantity", String(data.quantity));
  fd.append("category", data.category);

  fd.append("brand[slug]", data.brand.slug);
  fd.append("brand[name]", data.brand.name);
  fd.append("brand[description]", data.brand.description);
  fd.append("brand[country]", data.brand.country);

  data.images.forEach((file) => {
    fd.append("images", file);
  });

  return fd;
};
