export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SELLER: "seller",
} as const;

export const USER_ROLES_ENUM = Object.values(USER_ROLES);
export type USER_ROLES_TYPE = typeof USER_ROLES_ENUM[number];
