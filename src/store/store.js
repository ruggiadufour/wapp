import { configureStore } from "@reduxjs/toolkit";
import forecast from "./forecast";
export const store = configureStore({
  reducer: {
    forecast: forecast,
  },
});
