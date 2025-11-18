import mongoose, { Schema } from "mongoose";

export interface IBrand {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model<IBrand>("Brand", brandSchema);

export { Brand };
