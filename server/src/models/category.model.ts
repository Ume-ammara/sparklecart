import mongoose, { Schema } from "mongoose";

export interface ICategory {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export { Category };
