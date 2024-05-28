import { Module } from '@nestjs/common';

import { OpenWeather } from './openWeather.service';

@Module({
  imports: [],
  providers: [OpenWeather],
  exports:[OpenWeather]
})
export class OpenWeatherRepo {}
