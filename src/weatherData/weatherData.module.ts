import { Module } from '@nestjs/common';
import { WeatherDataController } from './weatherData.controller';
import { WeatherDataService } from './weatherData.service';
import { OpenWeatherRepo } from '../repository/openWeather/openWeather.module';

@Module({
  imports: [OpenWeatherRepo],
  controllers: [WeatherDataController],
  providers: [WeatherDataService],
})
export class WeatherAppModule {}
