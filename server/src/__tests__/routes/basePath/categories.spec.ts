import request from 'supertest';
import { app } from '../../../server';

describe('Base route tests', () => {
  describe('When testing the /categories endpoint', () => {
    it('Should successfully return a valid categories list', () => {
      request(app)
        .get('/categories')
        .end((err, res) => {
          const expectedKeys = ['id', 'title', 'emissionSources'];
          const firstCategory = res.body[0];

          expect(Object.keys(firstCategory)).toEqual(expectedKeys);
          expect(res.statusCode).toBe(200);
        });
    });
  });
});
