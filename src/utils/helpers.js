function formatForecastData({ city, list }) {
  const formatedList = list.map((obj) => ({
    date: obj.dt_txt,
    temp: obj.main.temp,
    feels_like: obj.main.feels_like,
    temp_min: obj.main.temp_min,
    temp_max: obj.main.temp_max,
    pressure: obj.main.pressure,
    humidity: obj.main.humidity,
    weather: obj.weather.main,
    description: obj.weather.description,
    icon: emojiFromIconCode(obj.weather.icon),
  }));
  return {
    list: formatedList,
    id: city.id,
    country: city.country,
    name: city.name,
  };
}

function emojiFromIconCode(iconCode) {
  const dict = {
    "01d": "☀️",
    "01n": "🌑️",
    "02d": "⛅️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "🌫️",
    "04n": "🌫️",
    "09d": "🌨️",
    "09n": "🌨️",
    "10d": "🌦️",
    "10n": "🌨️",
    "11d": "🌩️",
    "11n": "🌩️",
    "13d": "🌨️",
    "13n": "🌨️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  return dict[iconCode] || "☀️";
}

export { formatForecastData };
