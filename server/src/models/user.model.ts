import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";

import { USER_ROLES_ENUM, USER_ROLES_TYPE } from "../constants/user.constant.js";
import { Seller } from "./seller.model.js";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  role: USER_ROLES_TYPE;
  isDeleted?: boolean;
  isEmailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  avatarUrl?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLES_ENUM,
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      trim: true,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Access and Refresh Tokens
userSchema.methods.generateAccessToken = async function () {
  let seller = null;
  if (this.role === "seller") {
    seller = await Seller.findOne({ user: this._id });
  }

  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      username: this.username,
      email: this.email,
      sellerId: seller?._id,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  let seller = null;
  if (this.role === "seller") {
    seller = await Seller.findOne({ user: this._id });
  }

  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      username: this.username,
      email: this.email,
      sellerId: seller?._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    }
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };
