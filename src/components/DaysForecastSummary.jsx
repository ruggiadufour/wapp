import React, { useEffect, useState } from "react";
import { dayNameFromDate } from "../utils/helpers";
import ForecastCard from "./ForecastCard";

export default function DaysForecastSumary({ forecasts = [] }) {
  const [formatedForecasts, setFormatedForecasts] = useState({});
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const map = new Map();

    forecasts.forEach((forecast) => {
      const dayName = dayNameFromDate(forecast.date);
      if (!map.has(dayName)) map.set(dayName, []);
      map.get(dayName).push(forecast);
    });

    setFormatedForecasts(Object.fromEntries(map));
    const [nextDay] = map.keys();
    setSelectedDay(nextDay);
  }, []);

  return (
    <div>
      <div className="overflow-auto w-full mb-6 border-b-2 border-pink-600">
        <div className="flex gap-6 ">
          {Object.keys(formatedForecasts).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedDay(key)}
              className={`font-medium text-purple-200 border-pink-600 p-2 ${
                selectedDay === key ? "border-b-4" : ""
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 overflow-auto pb-4">
        {formatedForecasts[selectedDay]?.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
