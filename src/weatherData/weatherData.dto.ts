export interface WeatherAppModel {
  data: WeatherAppData;
}

export interface WeatherModelUnit {
  temp: string;
  prediction: WeatherType;
  date: string;
  icon: string;
  description: string;
}

export interface WeatherAppData {
  today: WeatherModelUnit[];
  tomorrow: WeatherModelUnit[];
  dayAfterTomorrow: WeatherModelUnit[];
}

export enum WeatherType {
  Thunderstorm = 'Thunderstorm',
  Drizzle = 'Drizzle',
  Rain = 'Rain',
  Snow = 'Snow',
  Mist = 'Mist',
  Smoke = 'Smoke',
  Haze = 'Haze',
  Dust = 'Dust',
  Fog = 'Fog',
  Sand = 'Sand',
  Squall = 'Squall',
  Tornado = 'Tornado',
  Clear = 'Clear',
  Clouds = 'Clouds',
  Wind = 'Wind',
  Hot = 'Hot'
}

export enum WeatherDescription {
  Rain = 'Carry umbrella',
  Hot = 'Use sunscreen lotio',
  Wind = 'It’s too windy, watch out!',
  Thunderstrom = 'Don’t step out! A Storm is brewing',
  Drizzle = 'Use an umbrella or raincoat for protection against moisture',
  Snow = 'Drive carefully and wear warm clothing',
  Mist = 'Exercise caution while driving',
  Smoke = 'Limit outdoor activities and stay indoors if sensitive to air pollution',
  Haze = 'Use headlights and reduce driving speed',
  Dust = 'Wear masks outdoors and keep windows closed',
  Fog = 'Use low-beam headlights and increase following distance when driving',
  Sand = 'Wear protective eyewear and avoid outdoor activities in affected areas',
  Squall = 'Secure loose objects and avoid boating or swimming',
  Tornado = 'Avoid windows and protect your head',
  Clear = 'Wear sunscreen and stay hydrated',
  Clouds = 'Expect changing weather conditions throughout the day.',
}
