import { addInvitedUserToCenterQuery } from "../../db/users/addInvitedUserToCenterQuery";
import { InvitedUserProps } from "../../db/users/addInvitedUserToCenterQuery";

export const addInvitedUserService = async (props: InvitedUserProps) => {
  const result = await addInvitedUserToCenterQuery(props);
  return result;
};
