import { Test, TestingModule } from '@nestjs/testing';
import { WeatherDataService } from './weatherData.service';
import { OpenWeather } from '../repository/openWeather/openWeather.service';
import { WeatherData } from '../repository/openWeather/openWeather.model';
import { DateTime } from 'luxon';
import { mockWeatherData } from '../repository/openWeather/weatherData.mock';

const mockDate = DateTime.fromISO('2024-06-06T15:36:02.792-04:00');
jest.mock('../repository/openWeather/openWeather.service');
jest.spyOn(Date, 'now').mockImplementation(() => mockDate as any);

describe('WeatherDataService', () => {
  let service: WeatherDataService;
  let openWeatherService: OpenWeather;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherDataService, OpenWeather],
    }).compile();

    service = module.get<WeatherDataService>(WeatherDataService);
    openWeatherService = module.get<OpenWeather>(OpenWeather);

    jest.clearAllMocks();
  });

  describe('getWeatherData', () => {
    it('should fetch and map weather data', async () => {
      const cityName = 'London';
      jest
        .spyOn(openWeatherService, 'getWeatherData')
        .mockResolvedValue(mockWeatherData);

      const result = await service.getWeatherData(cityName);

      expect(openWeatherService.getWeatherData).toHaveBeenCalledWith(cityName);

      expect(result).toEqual({
        data: {
          dayAfterTomorrow: [
            {
              date: '2024-06-08 00:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: 'Clouds',
              temp: '11.83',
            },
            {
              date: '2024-06-08 12:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: 'Rain',
              temp: '16.74',
            },
            {
              date: '2024-06-08 15:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: 'Rain',
              temp: '19.08',
            },
            {
              date: '2024-06-08 18:00:00',
              description: 'Carry umbrella',
              icon: '10d',
              prediction: 'Rain',
              temp: '17.33',
            },
            {
              date: '2024-06-08 21:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: 'Clouds',
              temp: '13.35',
            },
          ],
          today: [
            {
              date: '2024-06-06 21:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '04n',
              prediction: 'Clouds',
              temp: '16.03',
            },
          ],
          tomorrow: [
            {
              date: '2024-06-07 00:00:00',
              description: 'Expect changing weather throughout the day',
              icon: '03n',
              prediction: 'Clouds',
              temp: '13.08',
            },
            {
              date: '2024-06-07 03:00:00',
              description: 'Wear sunscreen and stay hydrated',
              icon: '01n',
              prediction: 'Clear',
              temp: '9.15',
            },
          ],
        },
      });
    });

    it('should handle errors gracefully', async () => {
      const cityName = 'UnknownCity';
      jest
        .spyOn(openWeatherService, 'getWeatherData')
        .mockRejectedValue(new Error('City not found'));

      await expect(service.getWeatherData(cityName)).rejects.toThrow(
        'City not found',
      );
    });
  });

  describe('mapData', () => {
    it('should map weather data correctly', () => {
      const mappedData = service['mapData'](mockWeatherData);

      expect(mappedData.today).toHaveLength(1);
      expect(mappedData.tomorrow).toHaveLength(2);
      expect(mappedData.dayAfterTomorrow).toHaveLength(5);
    });
  });

  describe('getPrediction', () => {
    it('should return correct predictions', () => {
      const prediction = service['getPrediction'](mockWeatherData.list);

      expect(prediction).toEqual([
        {
          date: '2024-06-06 21:00:00',
          description: 'Expect changing weather throughout the day',
          icon: '04n',
          prediction: 'Clouds',
          temp: '16.03',
        },
        {
          date: '2024-06-07 00:00:00',
          description: 'Expect changing weather throughout the day',
          icon: '03n',
          prediction: 'Clouds',
          temp: '13.08',
        },
        {
          date: '2024-06-07 03:00:00',
          description: 'Wear sunscreen and stay hydrated',
          icon: '01n',
          prediction: 'Clear',
          temp: '9.15',
        },
        {
          date: '2024-06-08 00:00:00',
          description: 'Expect changing weather throughout the day',
          icon: '03n',
          prediction: 'Clouds',
          temp: '11.83',
        },
        {
          date: '2024-06-08 12:00:00',
          description: 'Carry umbrella',
          icon: '10d',
          prediction: 'Rain',
          temp: '16.74',
        },
        {
          date: '2024-06-08 15:00:00',
          description: 'Carry umbrella',
          icon: '10d',
          prediction: 'Rain',
          temp: '19.08',
        },
        {
          date: '2024-06-08 18:00:00',
          description: 'Carry umbrella',
          icon: '10d',
          prediction: 'Rain',
          temp: '17.33',
        },
        {
          date: '2024-06-08 21:00:00',
          description: 'Expect changing weather throughout the day',
          icon: '03n',
          prediction: 'Clouds',
          temp: '13.35',
        },
        {
          date: '2024-06-09 00:00:00',
          description: 'Expect changing weather throughout the day',
          icon: '02n',
          prediction: 'Clouds',
          temp: '10.93',
        },
        {
          date: '2024-06-09 03:00:00',
          description: 'Wear sunscreen and stay hydrated',
          icon: '01n',
          prediction: 'Clear',
          temp: '9.41',
        },
        {
          date: '2024-06-09 06:00:00',
          description: 'Wear sunscreen and stay hydrated',
          icon: '01d',
          prediction: 'Clear',
          temp: '11.21',
        },
        {
          date: '2024-06-09 09:00:00',
          description: 'Wear sunscreen and stay hydrated',
          icon: '01d',
          prediction: 'Clear',
          temp: '15.91',
        },
      ]);
    });
  });

  describe('checkWeather', () => {
    it('should return Hot if temperature is greater than 40°C', () => {
      const data = {
        dt_txt: '2023-01-02 00:00:00',
        main: { temp: 290.15, temp_max: 315.15 },
        weather: [
          { id: 500, icon: '09d', main: 'sunny', description: 'sunny' },
        ],
        wind: { speed: 15, deg: 5 },
      };
      const result = service['checkWeather'](data);

      expect(result).toBe('Hot');
    });

    it('should return Wind if wind speed is greater than 10 m/s', () => {
      const data = {
        dt_txt: '2023-01-02 00:00:00',
        main: { temp: 290.15, temp_max: 295.15 },
        weather: [
          { id: 500, icon: '09d', main: 'sunny', description: 'sunny' },
        ],
        wind: { speed: 15, deg: 5 },
      };
      const result = service['checkWeather'](data);

      expect(result).toBe('Wind');
    });

    it('should map icon id to weather type', () => {
      const data = {
        dt_txt: '2023-01-02 00:00:00',
        main: { temp: 290.15, temp_max: 295.15 },
        weather: [{ id: 800, icon: '09d', main: 'Clear', description: '' }],
        wind: { speed: 5, deg: 5 },
      };
      const result = service['checkWeather'](data);

      expect(result).toBe('Clear');
    });
  });

  describe('kelvinToCelsius', () => {
    it('should convert Kelvin to Celsius', () => {
      const result = service['kelvinToCelsius'](300.15);

      expect(result).toBeCloseTo(27);
    });
  });
});
