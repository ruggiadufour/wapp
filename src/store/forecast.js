import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searches: [],
  homePreview: {
    name: "",
    country: "",
    forecasts: [
      {
        date: "",
        temp: "",
        feels_like: "",
        temp_min: "",
        temp_max: "",
        pressure: "",
        humidity: "",
        weather: "",
        description: "",
        icon: "",
      },
    ],
  },
};

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.searches.push(action.payload);
    },
    removeCity: (state, action) => {
      state.searches = state.searches.filter(
        (search) => search.id === action.payload
      );
    },
  },
});

export const { addCity, removeCity } = forecastSlice.actions;

export default forecastSlice.reducer;
