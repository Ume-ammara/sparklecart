import mongoose, { Schema } from "mongoose";

export interface IBrand {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    // established: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Brand = mongoose.model<IBrand>("Brand", brandSchema);

export { Brand };
