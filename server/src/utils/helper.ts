import crypto from "crypto";

export const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
  const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  return { unHashedToken, hashedToken, tokenExpiry };
};

export const createCryptoHash = (value: string) => {
  return crypto.createHash("sha256").update(value).digest("hex");
};
