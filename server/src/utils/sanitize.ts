import { IUser } from "../models/user.model.js";

export const sanitizeUser = ({
  _id,
  fullname,
  email,
  role,
  isEmailVerified,
  avatarUrl,
  lastLogin,
  createdAt,
  updatedAt,
}: IUser) => {
  return {
    _id,
    fullname,
    email,
    role,
    isEmailVerified,
    avatarUrl,
    lastLogin,
    createdAt,
    updatedAt,
  };
};
