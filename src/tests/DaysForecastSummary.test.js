import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DaysForecastSummary from "../components/DaysForecastSummary";

const forecasts = [
  {
    temp: 42,
    feels_like: 43,
    temp_min: 39,
    temp_max: 45,
    pressure: 900,
    humidity: 66,
    weather: "Clouds",
    description: "Broker clouds",
    date: "2022-06-21 22:00:00",
    icon: "🌫️",
  },
  {
    temp: 52,
    feels_like: 53,
    temp_min: 49,
    temp_max: 55,
    pressure: 950,
    humidity: 76,
    weather: "Clouds",
    description: "Scattered clouds",
    date: "2022-06-22 08:00:00",
    icon: "☁️",
  },
];

describe("test the component DaysForecastSummary", () => {
  let utils;
  beforeEach(() => {
    utils = render(<DaysForecastSummary forecasts={forecasts} />);
  });
  test("show Tuesday button", () => {
    expect(utils.getByText("Tuesday")).toBeInTheDocument();
  });

  test("show Wednesday button", () => {
    expect(utils.getByText("Wednesday")).toBeInTheDocument();
  });

  test("is rendering the first forecast", () => {
    expect(utils.getByText("10:00 PM")).toBeInTheDocument();
    expect(utils.getByText("42°")).toBeInTheDocument();
    expect(utils.getByText("🌫️")).toBeInTheDocument();
  });

  test("change to Wednesday and show its forecast", () => {
    const button = utils.getByText("Wednesday");
    fireEvent.click(button);
    expect(utils.getByText("8:00 AM")).toBeInTheDocument();
    expect(utils.getByText("52°")).toBeInTheDocument();
    expect(utils.getByText("☁️")).toBeInTheDocument();
  });
});
