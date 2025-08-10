// src/@types/express/index.d.ts

import { UsersTableData } from "../../types/users";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UsersTableData>;
      auth?: any;
    }
  }
}
