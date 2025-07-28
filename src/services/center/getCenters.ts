import { getCenterQuery, getAllCentersQuery } from "../../db/center/getCenters";

export async function getAllCentersService(userId: string) {
  const user_id = Number(userId);
  const centers = await getAllCentersQuery(user_id);
  return centers;
}

export async function getCenterService(centerId: string, userId: string) {
  const center_id = Number(centerId);
  const user_id = Number(userId);
  const centers = await getCenterQuery(center_id, user_id);
  return centers;
}
