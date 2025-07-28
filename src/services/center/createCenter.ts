import { Center } from "../../types/center";
import { createCenterQuery } from "../../db/center/createCenterQuery";

export async function createCenterService(props: Partial<Center>) {
  const { name, address, phone } = props;
  const result = await createCenterQuery({
    name,
    address,
    phone,
  });
  return result;
}
