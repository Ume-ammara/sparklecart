import mongoose, { Schema } from "mongoose";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  quantity: number;
  images: string[];
  seller: mongoose.Types.ObjectId;
  inStock: boolean;
  brand: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export { Product };
