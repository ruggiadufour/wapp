import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCity, removeCity } from "../store/forecast";

export default function Home() {
  const { searches } = useSelector((state) => state.forecast);
  const [loading, setLoading] = useState(false);

  function content() {
    return (
      <div>
        <div className="flex justify-evenly">
          <div>
            <h1 className="text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {searches?.at(-1).name}
            </h1>
            <p className="text-4xl text-purple-400">September 25, 2015</p>
            <div className="w-fit flex flex-col items-center justify-center">
              <img
                src="http://openweathermap.org/img/wn/04n@2x.png"
                alt=""
                width={200}
                height={200}
              />
              <span className="text-3xl font-bold text-white text-purple-300">
                Cloudy
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-9xl text-pink-600">72°</span>
            <span className="text-5xl text-purple-300">82°/59°</span>
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex gap-6 border-b-2 border-pink-600 mb-6 ">
            <button className="font-medium text-purple-200 border-b-4 border-pink-600 p-2">
              Lunes
            </button>
            <button className="font-medium text-purple-200  border-pink-600 p-2">
              Martes
            </button>
            <button className="font-medium text-purple-200  border-pink-600 p-2">
              Miercoles
            </button>
            <button className="font-medium text-purple-200  border-pink-600 p-2">
              Jueves
            </button>
            <button className="font-medium text-purple-200  border-pink-600 p-2">
              Viernes
            </button>
          </div>
          <div className="flex gap-3 overflow-auto pb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((el) => (
              <div
                key={el}
                className="rounded-sm bg-gradient-to-r from-purple-400 to-pink-600"
              >
                <div className="bg-slate-700 m-1 p-2 w-40 flex flex-col items-center">
                  <span className="text-2xl text-purple-300">11AM</span>
                  <img
                    src="http://openweathermap.org/img/wn/04n@2x.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <span className="text-4xl text-purple-300">72°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 flex-1 flex items-center justify-center p-7">
      <div className="max-w-5xl w-full">
        {loading ? (
          <h1 className="text-7xl text-center  font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Loading...
          </h1>
        ) : (
          content()
        )}
      </div>
    </div>
  );
}
