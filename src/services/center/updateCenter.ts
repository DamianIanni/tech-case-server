import { Center } from "../../types/center";
import { updateCenterQuery } from "../../db/center/updateCenterQuery";

export async function updateCenterService(
  centerId: string,
  updateData: Partial<Center>
) {
  const values = { ...updateData, id: centerId };
  const updatedCenter = await updateCenterQuery(values);
  return updatedCenter;
}
