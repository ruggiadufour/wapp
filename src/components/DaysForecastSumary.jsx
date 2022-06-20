import React, { useEffect, useState } from "react";
import { dayNameFromDate, hourFromDate } from "../utils/helpers";
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

  useEffect(() => {
    console.log(
      Object.entries(formatedForecasts).map(function ([key, value]) {
        console.log(key, value);
      })
    );
  }, [formatedForecasts]);
  return (
    <div>
      <div className="flex gap-6 border-b-2 border-pink-600 mb-6 ">
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
      <div className="flex gap-3 overflow-auto pb-4">
        {formatedForecasts[selectedDay]?.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
