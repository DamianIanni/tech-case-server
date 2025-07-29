import { getCenterQuery, getAllCentersQuery } from "../../db/center/getCenters";

export async function getAllCentersService(userId: string) {
  const centers = await getAllCentersQuery(userId);
  return centers;
}

export async function getCenterService(centerId: string, userId: string) {
  const centers = await getCenterQuery(centerId, userId);
  return centers;
}
