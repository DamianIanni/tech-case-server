import { Center } from "../../types/center";
import {
  createCenterQuery,
  insertUserCenterQuery,
} from "../../db/center/createCenterQuery";

export async function createCenterService(props: Partial<Center>) {
  const { name, address, phone } = props;
  const result = await createCenterQuery({
    name,
    address,
    phone,
  });
  return result;
}

export async function insertUserCenterService(
  center_id: string,
  user_id: string
) {
  const VALUES = [user_id, center_id, "admin", "active"];
  const result = await insertUserCenterQuery(VALUES);
  return result;
}
