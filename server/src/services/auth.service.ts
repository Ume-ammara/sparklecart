import { UAParser } from "ua-parser-js";
import { cookieOptions } from "../config/cookie.config.js";
import { env } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import {
  LoginDTO,
  LogoutDTO,
  RefreshDTO,
  RegisterDTO,
  VerifyEmailDTO,
} from "../schemas/auth.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { emailVerificationMailGenContent } from "../utils/emailTemplates.js";
import { createCryptoHash, generateTemporaryToken } from "../utils/helper.js";
import { logger } from "../utils/logger.js";
import { sanitizeUser } from "../utils/sanitize.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Session } from "../models/session.model.js";
import { Response } from "express";
import { Cart } from "../models/cart.model.js";

export const registerService = async ({ fullname, email, password }: RegisterDTO) => {
  logger.info(`Attempt to register user : email - ${email}`);

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    logger.warn(`Registration failed: User already exists with Email - ${email}`);
    throw new ApiError(409, "User already exists with this email");
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  logger.info(`User Created: Now sending email at - ${email}`);

  const { hashedToken, unHashedToken, tokenExpiry } = generateTemporaryToken();

  const verificationUrl = `${env.FRONTEND_URL}/auth/verify/${unHashedToken}`;

  sendEmail({
    email,
    subject: "Verify Email",
    mailGenContent: emailVerificationMailGenContent(fullname, verificationUrl),
  });

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  const updateUser = await user.save();

  logger.info(`Register Attempt Successfull : User registed and email sent at - ${email} `);
  return sanitizeUser(updateUser);
};

export const VerifyEmailService = async ({ token }: VerifyEmailDTO) => {
  logger.info(`Attemp To Verify User Email : Checking if user exists for token - ${token}`);

  const newHashedToken = createCryptoHash(token);

  const user = await User.findOne({
    emailVerificationToken: newHashedToken,
  });

  if (!user) {
    logger.error(`Invalid Request : User not found for this token - ${token}`);
    throw new ApiError(400, "Invalid verification link or user is already verified");
  }

  if (user.isEmailVerified) {
    logger.warn(`Invalid request : User is already verified with email - ${user.email}`);
    throw new ApiError(403, "User email is already verified");
  }

  if (user.emailVerificationExpiry && user.emailVerificationExpiry < new Date()) {
    logger.warn(`Veification Failed : Token expired for - ${user.email}`);
    const { hashedToken, unHashedToken, tokenExpiry } = generateTemporaryToken();

    const verificationUrl = `${env.FRONTEND_URL}/auth/verify/${unHashedToken}`;

    sendEmail({
      email: user.email,
      subject: "Verify Email",
      mailGenContent: emailVerificationMailGenContent(user.fullname, verificationUrl),
    });

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save();

    throw new ApiError(
      401,
      "Verification link expired, we have sent a new verification link. Please check you inbox"
    );
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  const updatedUser = await user.save();
  logger.info(`Verification Successfull : User verified with email - ${user.email}`);

  return sanitizeUser(updatedUser);
};

export const loginService = async (
  { email, password }: LoginDTO,
  ipAddress: string,
  userAgent: string
) => {
  logger.info(`Attempt To Login : Finding user with email - ${email}`);
  const user = await User.findOne({
    email,
  });

  if (!user) {
    logger.error(`Login Failed : User doesn't exists with email - ${email}`);
    throw new ApiError(401, "User not found with this email");
  }

  if (!user.isEmailVerified) {
    logger.warn(`Login Failed : User email is not verified - ${email}`);
    throw new ApiError(403, "User email is not verified");
  }

  if (user.isDeleted) {
    logger.warn(`Login Failed : User is deleted - ${email}`);
    throw new ApiError(403, "User is deleted");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    logger.error(`Login Failed : Incorrect password for user - ${email}`);
    throw new ApiError(401, "Incorrect password");
  }

  const ua = UAParser(userAgent);

  const session = await Session.create({
    user: user._id,
    ipAddress,
    userAgent,
    device: ua.device.model,
    os: ua.os.name + " " + ua.os.version,
    browser: ua.browser.name + " " + ua.browser.version,
    isValid: true,
  });

  const accessToken = await user.generateAccessToken();
  const accessTokenOptions = cookieOptions(30);

  const refreshToken = await user.generateRefreshToken();
  const refreshTokenOptions = cookieOptions(60 * 24 * 30);

  session.refreshToken = createCryptoHash(refreshToken);
  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await session.save();

  user.lastLogin = new Date();
  const updatedUser = await user.save();

  logger.info(`Login Successfull : User logged in with email - ${email}`);

  return {
    user: sanitizeUser(updatedUser),
    accessToken,
    accessTokenOptions,
    refreshToken,
    refreshTokenOptions,
  };
};

export const refreshAccessTokenService = async (
  { token }: RefreshDTO,
  ipAddress: string,
  userAgent: string,
  res: Response
) => {
  logger.info(`Attemp To Refresh Token : Refresing token - ${token}`);
  const hashedToken = createCryptoHash(token);

  const session = await Session.findOne({
    refreshToken: hashedToken,
  });

  if (!session) {
    res.clearCookie("accessToken", cookieOptions(0));
    res.clearCookie("refreshToken", cookieOptions(0));
    logger.warn(`Possible Token Replay Detected: Refresh token not found or reused - ${token}`);
    throw new ApiError(401, "Invalid or expired refresh token. Please log in again.");
  }

  const user = await User.findById(session.user.toString());

  if (!user) {
    logger.error(`Refreshing Token Failed : User not found with session id - ${session.id}`);
    throw new ApiError(401, "User not found, please login again.");
  }

  const accessToken = await user.generateAccessToken();
  const accessTokenOptions = cookieOptions(30);

  const refreshToken = await user.generateRefreshToken();
  const refreshTokenOptions = cookieOptions(60 * 24 * 30);

  const ua = UAParser(userAgent);
  console.log("UA Data: ", ua);

  await Session.updateMany(
    {
      _id: session._id,
    },
    {
      ipAddress,
      userAgent,
      device: ua.device.model,
      os: ua.os.name + " " + ua.os.version,
      browser: ua.browser.name + " " + ua.browser.version,
      refreshToken: createCryptoHash(refreshToken),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }
  );

  user.lastLogin = new Date();
  const updatedUser = await user.save();

  logger.info(`Refreshing Token Successfull : User refreshed token with email - ${user.email}`);

  return {
    user: sanitizeUser(updatedUser),
    accessToken,
    accessTokenOptions,
    refreshToken,
    refreshTokenOptions,
  };
};

export const logoutService = async ({ refreshToken }: LogoutDTO) => {
  logger.info(`Attempt To Logout : Logging out user with access token - ${refreshToken}`);

  const hashedToken = createCryptoHash(refreshToken);

  const session = await Session.findOne({
    refreshToken: hashedToken,
  });

  if (!session) {
    logger.error(`Logout Failed : Session not found for token - ${refreshToken}`);
    throw new ApiError(401, "Session not found. Please log in again.");
  }

  if (session.expiresAt && new Date() > session.expiresAt) {
    logger.warn(`Logout Failed : Session expired or revoked for token - ${refreshToken}`);
    throw new ApiError(403, "Session expired or revoked. Please log in again.");
  }

  await Session.deleteOne({
    _id: session._id,
  });

  logger.info(`Logout Successfull : User logged out with access token - ${refreshToken}`);
  return { options: cookieOptions(0) };
};
