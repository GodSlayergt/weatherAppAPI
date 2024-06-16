import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { WeatherAppModule } from './weatherData/weatherData.module';

describe('AppModule', () => {
  let appModule: AppModule;
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = testingModule.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
