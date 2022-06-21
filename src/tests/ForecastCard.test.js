import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForecastCard from "../components/ForecastCard";

const hoverContent = {
  temp: 42,
  feels_like: 43,
  temp_min: 39,
  temp_max: 45,
  pressure: 900,
  humidity: 66,
  weather: "Clouds",
  description: "Broker clouds",
};

const forecast = {
  date: "2022-06-21 19:00:00",
  icon: "🌫️",
  ...hoverContent,
};

describe("test the component ForecastCard", () => {
  let utils;
  beforeEach(() => {
    utils = render(<ForecastCard forecast={forecast} />);
  });

  test("renders the hour correctly", () => {
    expect(utils.getByText("7:00 PM")).toBeInTheDocument();
  });

  test("renders the icon correctly", () => {
    expect(utils.getByText(forecast.icon)).toBeInTheDocument();
  });

  test("renders the temperature correctly", () => {
    expect(utils.getByText(forecast.temp)).toBeInTheDocument();
  });

  test("renders the temperature correctly", () => {
    expect(utils.getByText(forecast.temp)).toBeInTheDocument();
  });

  test("the hover content is rendered", () => {
    Object.values(hoverContent).forEach((value) => {
      expect(utils.queryByText(value)).toBeInTheDocument();
    });
  });
});
