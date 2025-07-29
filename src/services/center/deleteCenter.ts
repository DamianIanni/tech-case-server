import { deleteCenterQuery } from "../../db/center/deleteCenterQuery";

export const deleteCenterService = async (centerId: string) => {
  const result = await deleteCenterQuery(centerId);
  return result;
};
