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
      const alreadySearched = state.searches.some(
        (forecast) => forecast.id == action.payload.id
      );
      if (alreadySearched) return;

      if (state.searches.length === 5) {
        state.searches.pop();
      }
      state.searches.unshift(action.payload);
    },
    removeCity: (state, action) => {
      state.searches = state.searches.filter(
        (search) => search.id !== action.payload
      );
    },
  },
});

export const { addCity, removeCity } = forecastSlice.actions;

export default forecastSlice.reducer;
