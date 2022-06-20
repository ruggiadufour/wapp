import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import DaysForecastSumary from "../components/DaysForecastSumary";
import { removeCity } from "../store/forecast";
import { formatDate } from "../utils/helpers";

export default function Search() {
  const dispatch = useDispatch();
  const { searches } = useSelector((state) => state.forecast);

  function deleteSearch(id) {
    dispatch(removeCity(id));
  }

  function searchMore() {
    const input = document.querySelector("[name='input-search']");
    input.value = "";
    input.focus();
  }

  if (!searches.length) {
    return (
      <h1 className="text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Please, search a city.
      </h1>
    );
  }

  return (
    <div className="max-w-5xl w-full">
      <h1 className="text-5xl w-fit font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Your searches:
      </h1>

      <div className="flex flex-col gap-4 mb-10">
        {searches.map((city) => (
          <div
            className="relative bg-slate-700 w-full p-4 rounded"
            key={city.id}
          >
            <h2 className="text-4xl text-purple-300">
              {city.name} ({city.country})
            </h2>
            <DaysForecastSumary forecasts={city.list} />
            <button
              title="Delete city"
              onClick={() => deleteSearch(city.id)}
              className="absolute top-[20px] right-[20px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              ❌️
            </button>
          </div>
        ))}
      </div>
      {searches.length < 5 && (
        <Button onClick={searchMore}>Search more cities</Button>
      )}
    </div>
  );
}
