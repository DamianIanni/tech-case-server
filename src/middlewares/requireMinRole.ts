// import { RolePriority } from "../types/roles";
// import { User } from "../types/users";
// import { Request, Response, NextFunction } from "express";

// const rolePriority: RolePriority = {
//   admin: 3,
//   manager: 2,
//   employee: 1,
// };

// export const requireMinRole = (minRole: keyof typeof rolePriority) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user as Partial<User>;
//     console.table(user);

//     if (rolePriority[user.role] >= rolePriority[minRole]) {
//       return next();
//     }

//     return res.status(403).json({ message: "Access denied" });
//   };
// };
