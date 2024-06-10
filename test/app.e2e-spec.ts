import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import path from 'path';
import * as fs from 'node:fs'
import { WeatherAppModel } from 'src/weatherData/weatherData.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/weather (GET)', async () => {
    const cityName = 'London';
    const response = await request(app.getHttpServer())
      .get('/weather')
      .query({ city: cityName })
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the expected structure of WeatherAppModel
    const weatherData= response.body as WeatherAppModel
    expect(weatherData.data.today.length).toBeGreaterThan(0)
    expect(weatherData.data.tomorrow.length).toBeGreaterThan(0)
    expect(weatherData.data.dayAfterTomorrow.length).toBeGreaterThan(0)
  });
});
