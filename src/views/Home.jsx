import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DaysForecastSumary from "../components/DaysForecastSummary";
import getForecastByCoordinates from "../utils/api/getForecastByCoordinates";
import { formatDate } from "../utils/helpers";
import { setHomePreview } from "../store/forecast";

export default function Home() {
  const dispatch = useDispatch();
  const { homePreview } = useSelector((state) => state.forecast);
  const [loading, setLoading] = useState(false);
  const [nextForecast, setNextForecast] = useState(null);

  useEffect(() => {
    /* if has id, then the data is already fetched */
    if (homePreview.id) {
      setNextForecast(homePreview.list?.[0] || null);
      return;
    }

    setLoading(true);
    const onSuccess = ({ coords }) => {
      const { latitude, longitude } = coords;
      fetchHomeData(latitude, longitude);
    };
    const onError = (e) => {
      /* if the user does not give permission, then we show the Mar del Plata forecast */
      fetchHomeData("-38.00228", "-57.55754");
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  async function fetchHomeData(latitude, longitude) {
    /* TODO: show error messages when the api returns them */
    const { data, errors } = await getForecastByCoordinates(
      latitude,
      longitude
    );
    setLoading(false);
    if (!errors) {
      dispatch(setHomePreview(data));
      setNextForecast(data.list?.[0] || null);
    }
  }

  return (
    <article className="max-w-5xl w-full">
      {loading || !nextForecast ? (
        <h1 className="text-3xl md:text-7xl text-center  font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Loading...
        </h1>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-evenly mb-10">
            <div>
              <h1 className="text-2xl md:text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {homePreview.name}
              </h1>
              <p className="text-sm md:text-4xl text-purple-400">
                {formatDate(nextForecast?.date)}
              </p>
              <div className="w-fit flex flex-col items-center justify-center">
                <span className="text-5xl md:text-8xl my-4">
                  {nextForecast?.icon}
                </span>
                <span
                  title={nextForecast?.description}
                  className="text-2xl md:text-3xl font-bold text-white text-purple-300"
                >
                  {nextForecast?.weather}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-9xl text-pink-600">
                {nextForecast?.temp}°
              </span>
              <span className="text-3xl md:text-5xl text-purple-300">
                <span title="Maximum temperature">
                  {nextForecast?.temp_max}°
                </span>
                /{" "}
                <span title="Minimum temperature">
                  {nextForecast?.temp_min}°
                </span>
              </span>
            </div>
          </div>
          <DaysForecastSumary forecasts={homePreview.list} />
        </div>
      )}
    </article>
  );
}
