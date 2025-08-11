import { UpdateCenterInput } from "../../validations/centerSchema";
import { updateCenterQuery } from "../../db/center/updateCenterQuery";

export async function updateCenterService(
  centerId: string,
  updateData: UpdateCenterInput
) {
  const values = { ...updateData, id: centerId };
  const updatedCenter = await updateCenterQuery(values);
  return updatedCenter;
}
