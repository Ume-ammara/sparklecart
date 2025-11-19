import mongoose, { Schema } from "mongoose";

export interface IWishlist {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema: Schema<IWishlist> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export { Wishlist };
