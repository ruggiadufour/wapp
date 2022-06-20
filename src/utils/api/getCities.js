import { POSITIONSTACK_KEY } from "../publicKeys";
import fetcher from "../fetcher";

export default async function (query) {
  const url = `http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_KEY}&query=${query}`;
  const { data, errors } = await fetcher(url);
  return { data, errors };
}
