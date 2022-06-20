import React, { useEffect, useState } from "react";
import DaysForecastSumary from "../components/DaysForecastSumary";
import getForecastByCoordinates from "../utils/api/getForecastByCoordinates";
import { formatForecastData } from "../utils/helpers";
import { formatDate } from "../utils/helpers";

export default function Home() {
  //const { searches } = useSelector((state) => state.forecast);
  const [loading, setLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(null);
  const [nextForecast, setNextForecast] = useState(null);

  useEffect(() => {
    setLoading(true);
    const onSuccess = ({ coords }) => {
      const { latitude, longitude } = coords;
      fetchHomeData(latitude, longitude);
    };
    const onError = (e) => {
      /* if the user does not give permission, then we show the Buenos Aires forecas */
      fetchHomeData("-34.607357", "-58.454595");
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  async function fetchHomeData(latitude, longitude) {
    if (currentCity) {
      setLoading(false);
      return;
    }

    const { data, errors } = await getForecastByCoordinates(
      latitude,
      longitude
    );
    setLoading(false);
    if (!errors) {
      setCurrentCity(data);
      setNextForecast(data.list?.[0] || null);
    }
  }

  function content() {
    return (
      <div>
        <div className="flex justify-evenly mb-10">
          <div>
            <h1 className="text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {currentCity.name}
            </h1>
            <p className="text-4xl text-purple-400">
              {formatDate(nextForecast?.date)}
            </p>
            <div className="w-fit flex flex-col items-center justify-center">
              {/* <img
                src="http://openweathermap.org/img/wn/04n@2x.png"
                alt=""
                width={200}
                height={200}
              /> */}
              <span className="text-8xl">{nextForecast?.icon}</span>
              <span className="text-3xl font-bold text-white text-purple-300">
                {nextForecast?.weather}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-9xl text-pink-600">
              {nextForecast?.temp}°
            </span>
            <span className="text-5xl text-purple-300">
              {nextForecast?.temp_max}°/{nextForecast?.temp_min}°
            </span>
          </div>
        </div>
        <DaysForecastSumary forecasts={currentCity.list} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full">
      {loading ? (
        <h1 className="text-7xl text-center  font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Loading...
        </h1>
      ) : (
        content()
      )}
    </div>
  );
}
