import { IUser as UserType } from "./user.ts";

declare global {
  namespace Express {
    interface User extends UserType {}

    interface Request {
      cookies?: { [key: string]: string };
      user?: Pick<UserType, "id" | "email">;
      refreshPayload?: Pick<UserType, "id" | "email">
    }
  }
}
