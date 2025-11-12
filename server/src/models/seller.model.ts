import mongoose, { Schema } from "mongoose";

export interface ISeller {
  name: string;
  description: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const sellerSchema: Schema<ISeller> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);

export { Seller };
