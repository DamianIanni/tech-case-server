// src/@types/express/index.d.ts

import { User } from "../../types/users";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}
