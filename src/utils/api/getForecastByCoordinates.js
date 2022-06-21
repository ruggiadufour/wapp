import { OPENWEATHER_KEY } from "../publicKeys";
import { fetcher } from "../helpers";
import { formatForecastData } from "../helpers";

export default async function (latitude, longitude) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${OPENWEATHER_KEY}&lat=${latitude}&lon=${longitude}`;
  const { data, errors } = await fetcher(url);
  return { data: formatForecastData(data), errors };
}
