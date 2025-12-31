export interface UserDTO {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  avatarUrl?: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}
