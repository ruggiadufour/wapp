export function formatForecastData({ city, list }) {
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

export function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function dayNameFromDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
  }).format(new Date(dateString));
}

export function hourFromDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));
}

export function kelvinToCelcius(temp) {
  return (parseFloat(temp) - 273.15).toFixed(2);
}

export function emojiFromIconCode(iconCode) {
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

export async function fetcher(...args) {
  let data = null,
    errors = null;
  const [url, ...restArgs] = args;
  const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${url}`;
  try {
    const res = await fetch(proxyUrl, ...restArgs);
    const json = await res.json();
    data = json.data || json;
  } catch (err) {
    errors = err;
  }
  return { data, errors };
}

export function debounce(cb, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
