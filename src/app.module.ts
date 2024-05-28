import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherAppModule } from './weatherData/weatherData.module';

@Module({
  imports: [WeatherAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
