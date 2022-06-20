import React, { useEffect, useState } from "react";
import { hourFromDate } from "../utils/helpers";

export default function ForecastCard({ forecast }) {
  const [information, setInformation] = useState([]);
  useEffect(() => {
    setInformation([
      ["Weather:", forecast.weather],
      ["Description:", forecast.description],
      ["Temperature:", forecast.temp],
      ["Max temp:", forecast.temp_max],
      ["Min temp:", forecast.temp_min],
      ["Feels like:", forecast.feels_like],
      ["Pressure like:", forecast.pressure],
      ["Humidity like:", forecast.humidity],
    ]);
  }, []);

  return (
    <div className="rounded-sm relative bg-gradient-to-r from-purple-400 to-pink-600">
      <div className="bg-slate-700 m-1 p-2 w-40 flex flex-col items-center">
        <span className="text-2xl text-purple-300">
          {hourFromDate(forecast.date)}
        </span>
        <span className="text-6xl my-2">{forecast?.icon}</span>
        <span className="text-4xl text-purple-300">{forecast?.temp}°</span>
      </div>
      <div className="absolute p-2 top-0 left-0 w-full h-full border-4 border-pink-600 bg-slate-700 opacity-0 hover:opacity-100 overflow-auto">
        <div className="flex flex-col text-white">
          {information
            .filter(([label, value]) => !!value)
            .map(([label, value]) => (
              <span key={label} className="text-sm break-all">
                <span className="text-purple-300">{label}</span> {value}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
