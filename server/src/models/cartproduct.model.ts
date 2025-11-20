import mongoose, { Schema } from "mongoose";

export interface ICartProduct {
  _id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  cart: mongoose.Types.ObjectId;
  quantity: number;
}

const cartProductSchema: Schema<ICartProduct> = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartProduct = mongoose.model<ICartProduct>("CartProduct", cartProductSchema);

export { CartProduct };
