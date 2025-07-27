import { dbpool } from "../../config/database";
import { ADD_INVITE_USER_CENTER } from "../queriesString/user";

export type InvitedUserProps = {
  user_id: string;
  center_id: string;
  role: "admin" | "user" | "employee";
  status: "pending" | "accepted" | "rejected";
};

export const addInvitedUserToCenterQuery = async (props: InvitedUserProps) => {
  const { user_id, center_id, role, status } = props;
  const values = [user_id, center_id, role, status];
  const result = await dbpool.query(ADD_INVITE_USER_CENTER, values);
  return result;
};
