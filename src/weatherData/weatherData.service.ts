import { Injectable } from '@nestjs/common';
import { OpenWeather } from 'src/repository/openWeather/openWeather.service';
import {
  WeatherAppContent,
  WeatherAppData,
  WeatherAppModel,
  WeatherModelUnit,
  WeatherType,
} from './weatherData.dto';
import {
  ForecastData,
  WeatherData,
} from 'src/repository/openWeather/openWeather.model';
import { DateTime } from 'luxon';
import { weatherIconMappings } from 'src/repository/openWeather/iconMap';

@Injectable()
export class WeatherDataService {
  constructor(private openWeatherService: OpenWeather) {}

  async getWeatherData(cityName: string): Promise<WeatherAppModel> {
    const data = await this.openWeatherService.getWeatherData(cityName);

    const mappedData = this.mapData(data);
    const content = this.getContent();
    return {
      data: mappedData,
      content,
    };
  }

  private mapData(data: WeatherData): WeatherAppData {
    // Get the current date
    const currentDate = DateTime.now();

    // Add one day to the current date to get the next day
    const currentDayString = currentDate.toFormat('yyyy-LL-dd');
    const tomorrowString = currentDate.plus({ days: 1 }).toFormat('yyyy-LL-dd');
    const dayAfterTomorrowString = currentDate
      .plus({ days: 2 })
      .toFormat('yyyy-LL-dd');

    const todayData = data.list.filter((fd: ForecastData) =>
      fd.dt_txt.toString().includes(currentDayString),
    );
    const tomorrowData = data.list.filter((fd) =>
      fd.dt_txt.toString().includes(tomorrowString),
    );
    const dayAfterTomorrowData = data.list.filter((fd) =>
      fd.dt_txt.toString().includes(dayAfterTomorrowString),
    );

    const todayPrediction = this.getPrediction(todayData);
    const tomorrowPrediction = this.getPrediction(tomorrowData);
    const dayAfterTomorrow = this.getPrediction(dayAfterTomorrowData);
    return {
      today: todayPrediction,
      tomorrow: tomorrowPrediction,
      dayAfterTomorrow: dayAfterTomorrow,
    };
  }

  private getPrediction(data: ForecastData[]): WeatherModelUnit[] {
    return data.map((d) => {
      {
        return {
          temp: this.kelvinToCelsius(d.main.temp).toFixed(2),
          prediction: this.checkWeather(d),
          date: d.dt_txt,
        };
      }
    });
  }

  private checkWeather(d: ForecastData): WeatherType {
    if (weatherIconMappings[d.weather[0].id.toString()].includes('rain'))
      return WeatherType.RAIN;
    if (this.kelvinToCelsius(d.main.temp_max) > 40) return WeatherType.HOT;
    if (d.wind.speed > 10) return WeatherType.WIND;
    if (weatherIconMappings[d.weather[0].id.toString()].includes('thunder'))
      return WeatherType.THUNDER;
    return WeatherType.SUNNY
  }

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  private getContent(): WeatherAppContent {
    return {
      rain: 'Carry umbrella',
      hot: 'Use sunscreen lotio',
      wind: 'It’s too windy, watch out!',
      thunder: 'Don’t step out! A Storm is brewing',
    };
  }
}
