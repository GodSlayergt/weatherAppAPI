import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherData } from './openWeather.model';

@Injectable()
export class OpenWeather {
  private readonly url: string;
  private readonly apiKey: string;

  constructor() {
    this.url = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = 'd2929e9483efc82c82c32ee7e02d563e';
  }

  private async getData(city: string): Promise<WeatherData> {
    const response = await axios.get<WeatherData>(this.buildWeatherUrl(city));
    const data: WeatherData = response.data;
    return data;
  }

  private buildWeatherUrl(city: string): string {
    return `${this.url}/forecast?q=${city}&appid=${this.apiKey}`;
  }

  async getWeatherData(city: string): Promise<WeatherData> {
    const weatherData = await this.getData(city);
    return weatherData;
  }
}
