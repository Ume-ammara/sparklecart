import mongoose, { Schema } from "mongoose";

export interface ISeller {
  storeName: string;
  storeDescription: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const sellerSchema: Schema<ISeller> = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    storeDescription: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);

export { Seller };
