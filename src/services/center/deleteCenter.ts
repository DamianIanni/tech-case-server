import { deleteCenterQuery } from "../../db/center/deleteCenterQuery";

export const deleteCenterService = async (centerId: string) => {
  const center_id = Number(centerId);
  const result = await deleteCenterQuery(center_id);
  return result;
};
