import request from 'supertest';
import { app } from '../../../server';

describe('Base route tests', () => {
  describe('When testing the /calculate endpoint', () => {
    it('Should return a valid emission result given a valid request', async () => {
      const res = await request(app)
        .get('/calculate?emissionSourceId=1&value=30');

      const expectedKeys = ['emission', 'unit'];

      expect(res.statusCode).toBe(200);
      expect(Object.keys(res.body)).toEqual(expectedKeys);
    });
    describe('When sending invalid requests', () => {
      it('Should return a 400 status for a request without the value query param', async () => {
        const res = await request(app)
          .get('/calculate?emissionSourceId=1');

        const expectedBody = { message: '"value" is required' };

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expectedBody);
      });
      it('Should return a 400 status for a request without the emissionSourceId query param', async () => {
        const res = await request(app)
          .get('/calculate?value=20');

        const expectedBody = { message: '"emissionSourceId" is required' };

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expectedBody);
      });
      it('Should return a 404 status for a request with a non-existent emissionSourceId', async () => {
        const requestedId = 99;
        const res = await request(app)
          .get(`/calculate?emissionSourceId=${requestedId}&value=30`);

        const expectedBody = {
          message: `Emission factor with id ${requestedId} not found`,
        };

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expectedBody);
      });
    });
  });
});
