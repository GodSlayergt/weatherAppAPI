import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { OpenWeather } from './openWeather.service';
import { mockWeatherData } from './weatherData.mock';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenWeather Service', () => {
  let service: OpenWeather;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenWeather],
    }).compile();

    service = module.get<OpenWeather>(OpenWeather);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return weather data for a city', async () => {
    const city = 'London';

    mockedAxios.get.mockResolvedValue(mockWeatherData);

    await service.getWeatherData(city);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=d2929e9483efc82c82c32ee7e02d563e`,
    );
  });

  it('should build the correct weather URL', () => {
    const city = 'New York';
    const url = service['buildWeatherUrl'](city); // Accessing the private method
    expect(url).toBe(`https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=d2929e9483efc82c82c32ee7e02d563e`);
  });
});
