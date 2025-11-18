import { Brand } from "../models/brand.model.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ProductQueryParamsDTO } from "../schemas/product.schema.js";

export const getAllProductsService = async (query: ProductQueryParamsDTO) => {
  const mongoQuery: any = {};

  if (query.search) {
    mongoQuery.name = { $regex: query.search, $options: "i" };
  }

  // Later will add  cache for category and brand lookups for performance improvement
  if (query.category) {
    mongoQuery.category = await Category.findOne({ name: query.category }).then((cat) => cat?._id);
  }
  if (query.brand) {
    mongoQuery.brand = await Brand.findOne({ name: query.brand }).then((brand) => brand?._id);
  }

  if (query["price[gte]"] || query["price[lte]"]) {
    mongoQuery.price = {};
    if (query["price[gte]"]) mongoQuery.price.$gte = query["price[gte]"];
    if (query["price[lte]"]) mongoQuery.price.$lte = query["price[lte]"];
  }

  //  Pagination and Sorting , skip the current page if searching next page , just give the response what limit have given
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const sort = query.sort ? query.sort.split(",").join(" ") : "-createdAt";

  const products = await Product.find(mongoQuery).sort(sort).skip(skip).limit(limit);

  return products;
};

export const getProductBySlugService = async (slug: string) => {};

export const getAllProductsByBrandService = async (slug: string) => {};
