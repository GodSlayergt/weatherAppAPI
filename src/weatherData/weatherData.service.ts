import { Injectable } from '@nestjs/common';
import { OpenWeather } from 'src/repository/openWeather/openWeather.service';
import {
  WeatherAppData,
  WeatherAppModel,
  WeatherDescription,
  WeatherModelUnit,
  WeatherType,
} from './weatherData.dto';
import {
  ForecastData,
  WeatherData,
} from 'src/repository/openWeather/openWeather.model';
import { DateTime } from 'luxon';
import { weatherIconMappings } from 'src/repository/openWeather/iconMap';
import { iconWeatherMap } from 'src/repository/openWeather/weathercode';

@Injectable()
export class WeatherDataService {
  constructor(private openWeatherService: OpenWeather) {}

  async getWeatherData(cityName: string): Promise<WeatherAppModel> {
    const data = await this.openWeatherService.getWeatherData(cityName);

    const mappedData = this.mapData(data);
    return {
      data: mappedData,
    };
  }

  private mapData(data: WeatherData): WeatherAppData {

    const seconds = data.city.timezone;
    const currentDate = DateTime.now()
      .setZone('UTC')
      .plus({ seconds: seconds });
    console.log(data, seconds, currentDate, 'testing');

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
        const weather = this.checkWeather(d);

        return {
          temp: this.kelvinToCelsius(d.main.temp).toFixed(2),
          prediction: weather,
          description: WeatherDescription[weather],
          date: d.dt_txt,
          icon: d.weather[0].icon,
        };
      }
    });
  }

  private checkWeather(d: ForecastData): WeatherType {
    if (this.kelvinToCelsius(d.main.temp_max) > 40) return WeatherType.Hot;
    if (d.wind.speed > 10) return WeatherType.Wind;

    return iconWeatherMap[d.weather[0].id];
  }

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
}
