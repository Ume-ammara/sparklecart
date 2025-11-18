import mongoose, { Schema } from "mongoose";

export interface ISession {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  refreshToken: string;
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  os?: string;
  browser?: string;
  isValid?: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema: Schema<ISession> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    device: {
      type: String,
      trim: true,
    },
    os: {
      type: String,
      trim: true,
    },
    browser: {
      type: String,
      trim: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);

export { Session };
