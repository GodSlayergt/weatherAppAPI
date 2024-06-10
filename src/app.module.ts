import { Module } from '@nestjs/common';
import { WeatherAppModule } from './weatherData/weatherData.module';

@Module({
  imports: [WeatherAppModule]
})
export class AppModule {}
