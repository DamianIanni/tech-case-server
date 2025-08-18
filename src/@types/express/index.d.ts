// src/@types/express/index.d.ts

import { UsersTableData } from "../../types/users";

declare global {
  namespace Express {
    interface Request {
      user?: UsersTableData & {
        id: string;
        role: string;
        center_id?: string; // Made optional with ?
      };
      auth?: any;
    }
  }
}
