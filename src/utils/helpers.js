function formatForecastData({ city, list }) {
  const formatedList = list.map((obj) => ({
    date: obj.dt_txt,
    temp: kelvinToCelcius(obj.main.temp),
    feels_like: kelvinToCelcius(obj.main.feels_like),
    temp_min: kelvinToCelcius(obj.main.temp_min),
    temp_max: kelvinToCelcius(obj.main.temp_max),
    pressure: obj.main.pressure,
    humidity: obj.main.humidity,
    weather: obj.weather?.[0].main,
    description: obj.weather?.[0].description,
    icon: emojiFromIconCode(obj.weather?.[0].icon),
  }));
  return {
    list: formatedList,
    id: city.id,
    country: city.country,
    name: city.name,
  };
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function dayNameFromDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
  }).format(new Date(dateString));
}

function hourFromDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));
}

function kelvinToCelcius(temp) {
  return (parseFloat(temp) - 273.15).toFixed(2);
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
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "🌩️",
    "11n": "🌩️",
    "13d": "🌨️",
    "13n": "🌨️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  return dict[iconCode] || "☀️";
}

export { formatForecastData, formatDate, dayNameFromDate, hourFromDate };
