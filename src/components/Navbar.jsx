import React from "react";
import InputSearch from "./InputSearch";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="relative bg-slate-800 py-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <Link to="/">
          <span className="text-4xl">
            <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Weather App
            </span>
            {" ⛅️"}
          </span>
        </Link>
        <InputSearch />
        <div className="relative sm:absolute sm:right-[20px]">
          <Link to="/search">
            <Button title="My searches" className="to-purple-400">
              🔎️
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
