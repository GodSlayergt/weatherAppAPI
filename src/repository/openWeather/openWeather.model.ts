interface WindData {
  speed: number;
  deg: number;
}
type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface MainWeatherData {
  temp: number;
  temp_max: number;
}

export type ForecastData = {
  main: MainWeatherData;
  weather: Weather[];
  wind: WindData;
  dt_txt:string
};

export type WeatherData = {
  list: ForecastData[];
};
