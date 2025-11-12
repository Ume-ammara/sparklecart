export interface AppUser {
  _id: string;
  email: string;
  role: string;
  sessionId: string;
  sellerId?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Request {
      user?: AppUser;
    }
  }
}
