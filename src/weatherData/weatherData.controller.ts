import { Controller, Get, Query } from '@nestjs/common';
import { ApiDefaultResponse, ApiResponse } from '@nestjs/swagger';
import { WeatherDataService } from './weatherData.service';
import { WeatherAppModel } from './weatherData.dto';

@Controller()
export class WeatherDataController {
  constructor(private readonly weatherDataService:WeatherDataService) {}

  @Get('/weather')
  @ApiResponse({status:200,description:"Get Weather for 3 days"})
  getWeatherData(@Query('city') cityName:string): Promise<WeatherAppModel> {
    return this.weatherDataService.getWeatherData(cityName);
  }



  
}
