import { Test, TestingModule } from '@nestjs/testing';
import { WeatherDataController } from './weatherData.controller';
import { WeatherDataService } from './weatherData.service';
import { WeatherAppModel, WeatherType } from './weatherData.dto';

describe('WeatherDataController', () => {
  let controller: WeatherDataController;
  let service: WeatherDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherDataController],
      providers: [
        {
          provide: WeatherDataService,
          useValue: {
            getWeatherData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WeatherDataController>(WeatherDataController);
    service = module.get<WeatherDataService>(WeatherDataService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWeatherData', () => {
    it('should return weather data for a city', async () => {
      const cityName = 'London';
      const weatherAppModel: WeatherAppModel = {
        data: {
          dayAfterTomorrow: [
            {
              date: '2024-06-08 00:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: WeatherType.Clouds,
              temp: '11.83',
            },
            {
              date: '2024-06-08 12:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: WeatherType.Rain,
              temp: '16.74',
            },
            {
              date: '2024-06-08 15:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: WeatherType.Rain,
              temp: '19.08',
            },
            {
              date: '2024-06-08 18:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: WeatherType.Rain,
              temp: '17.33',
            },
            {
              date: '2024-06-08 21:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: WeatherType.Clouds,
              temp: '13.35',
            },
          ],
          today: [
            {
              date: '2024-06-06 21:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '04n',
              prediction: WeatherType.Clouds,
              temp: '16.03',
            },
          ],
          tomorrow: [
            {
              date: '2024-06-07 00:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: WeatherType.Clouds,
              temp: '13.08',
            },
            {
              date: '2024-06-07 03:00:00',
              description: 'Wear sunscreen and stay hydrated',
              icon: '01n',
              prediction: WeatherType.Clear,
              temp: '9.15',
            },
          ],
        },
      };

      jest.spyOn(service, 'getWeatherData').mockResolvedValue(weatherAppModel);

      const result = await controller.getWeatherData(cityName);
      expect(result).toEqual(weatherAppModel);
      expect(service.getWeatherData).toHaveBeenCalledWith(cityName);
    });
  });
});
