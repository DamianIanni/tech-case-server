import { centerContextQuery } from "../../db/helpers/centerContextQuery";

export const centerContextService = async (user_id: string) => {
  const availableContextsResult = await centerContextQuery(user_id);

  return availableContextsResult;
};
