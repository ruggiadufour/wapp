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
    "01d": "âī¸",
    "01n": "đī¸",
    "02d": "âī¸",
    "03d": "âī¸",
    "03n": "âī¸",
    "04d": "đĢī¸",
    "04n": "đĢī¸",
    "09d": "đ§ī¸",
    "09n": "đ§ī¸",
    "10d": "đĻī¸",
    "10n": "đ§ī¸",
    "11d": "đŠī¸",
    "11n": "đŠī¸",
    "13d": "đ¨ī¸",
    "13n": "đ¨ī¸",
    "50d": "đĢī¸",
    "50n": "đĢī¸",
  };

  return dict[iconCode] || "âī¸";
}

export async function fetcher(...args) {
  let data = null,
    errors = null;
  try {
    const res = await fetch(...args);
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
