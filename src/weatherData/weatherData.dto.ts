export interface WeatherAppModel {
  data: WeatherAppData;
  content: WeatherAppContent;
}

export interface WeatherModelUnit{
    temp:string,
    prediction:WeatherType,
    date:string
}

export interface WeatherAppData {
 today:WeatherModelUnit[],
 tomorrow:WeatherModelUnit[],
 dayAfterTomorrow:WeatherModelUnit[]
}

export interface WeatherAppContent {
  hot: string;
  rain: string;
  wind: string;
  thunder: string;
}

export enum WeatherType {
  RAIN = 'rain',
  THUNDER = 'thunderstrom',
  WIND = 'wind',
  HOT = 'hot',
  SUNNY ='sunny'
}

