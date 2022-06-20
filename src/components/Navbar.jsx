import React from "react";
import InputSearch from "./InputSearch";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 py-4 px-20">
      <div className="flex gap-6 justify-center items-center">
        <Link to="/">
          <span className="text-4xl">
            <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Weather App
            </span>
            {" ⛅️"}
          </span>
        </Link>
        <InputSearch />
      </div>
    </nav>
  );
}
