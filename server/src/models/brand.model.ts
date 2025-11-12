import mongoose, { Schema } from "mongoose";

export interface IBrand {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  country: string;
  established: number;
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
    socialMediaLinks: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    country: {
      type: String,
      required: true,
    },
    established: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model<IBrand>("Brand", brandSchema);

export { Brand };
