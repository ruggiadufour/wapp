import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputOptions from "./InputOptions";
import { debounce } from "../utils/helpers";
import getCities from "../utils/api/getCities";
import getForecastByCoordinates from "../utils/api/getForecastByCoordinates";
import { addCity } from "../store/forecast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

let onDebouncedChange = () => {};

export default function InputSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("");
  const [searchByCoordinates, setSearchByCoordinates] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onDebouncedChange = debounce((value) => onChange(value), 1500);
  }, []);

  async function onChange(value) {
    /* TODO: show error messages when the api returns them */
    const { data, errors } = await getCities(value);
    setLoading(false);

    /* if there are errors then the city api call went wrong and then we must to enable the search by coordiantes */
    if (errors) {
      setSearchByCoordinates(true);
    }

    const options = getFormatedData(data);
    setCityOptions(options);
  }

  function getFormatedData(options) {
    return options.map((option, i) => ({
      name: `${option.locality}, ${option.region} (${option.country_code})`,
      id: `${option.label}-${i}`,
      longitude: option.longitude,
      latitude: option.latitude,
    }));
  }

  function handleChange(e) {
    setLoading(true);

    const { value } = e.target;
    setCityName(value);
    onDebouncedChange(value);
  }

  async function searchCity(option) {
    const { latitude, longitude } = option;
    setLoading(true);

    /* TODO: show error messages when the api returns them */
    const { data, errors } = await getForecastByCoordinates(
      latitude,
      longitude
    );
    setLoading(false);
    dispatch(addCity(data));
    navigate("/search");
  }

  function handleCoordinates(e) {
    e.preventDefault();
    searchCity(coordinates);
  }

  return (
    <div className="relative">
      {searchByCoordinates ? (
        <form
          onSubmit={handleCoordinates}
          className="flex flex-col md:flex-row gap-2"
        >
          <Input
            value={coordinates.latitude}
            onChange={({ target }) =>
              setCoordinates((c) => ({ ...c, latitude: target.value }))
            }
            required
            placeholder="Latitude"
            name="input-search"
          />
          <Input
            value={coordinates.longitude}
            onChange={({ target }) =>
              setCoordinates((c) => ({ ...c, longitude: target.value }))
            }
            required
            placeholder="Longitude"
          />
          <Button type="submit" className="w-[7.5rem]" disabled={loading}>
            {loading ? "⏳️" : "Search"}
          </Button>
        </form>
      ) : (
        <InputOptions
          options={cityOptions}
          value={cityName}
          onChange={handleChange}
          onSelectOption={searchCity}
          placeholder="Search a city 🏢️"
          autoComplete="off"
          name="input-search"
          loading={loading}
        />
      )}
      <button
        title="Search by coordinates/city"
        className="absolute right-[-30px] top-2/4 translate-y-[-50%]"
        onClick={() => setSearchByCoordinates((v) => !v)}
      >
        🔃️
      </button>
    </div>
  );
}
