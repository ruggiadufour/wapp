import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputOptions from "./InputOptions";
import debounce from "../utils/debounce";
import getCities from "../utils/api/getCities";
import getForecastByCoordinates from "../utils/api/getForecastByCoordinates";
import { addCity } from "../store/forecast";
import { useDispatch } from "react-redux";

let onDebouncedChange = () => {};

export default function InputSearch() {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("");
  const [searchByCoordinates, setSearchByCoordinates] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onChange(value) {
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

  useEffect(() => {
    onDebouncedChange = debounce((value) => onChange(value), 1500);
  }, []);

  function handleChange(e) {
    setLoading(true);

    const { value } = e.target;
    setCityName(value);
    onDebouncedChange(value);
  }

  async function onSelectOption(option) {
    const { latitude, longitude } = option;
    console.log(latitude, longitude);
    setLoading(true);

    const { data, errors } = await getForecastByCoordinates(
      latitude,
      longitude
    );
    setLoading(false);
    console.log(errors);
    console.log(data);
    dispatch(addCity(data));
  }

  return (
    <div className="relative">
      {searchByCoordinates ? (
        <div className="flex gap-2">
          <Input placeholder="Latitude" />
          <Input placeholder="Longitude" />
        </div>
      ) : (
        <InputOptions
          options={cityOptions}
          value={cityName}
          onChange={handleChange}
          onSelectOption={onSelectOption}
          placeholder="Search a city 🏢️"
          autoComplete="off"
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
