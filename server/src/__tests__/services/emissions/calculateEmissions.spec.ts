import { calculateEmission } from '@src/services/emissions';

describe('Emissions service test', () => {
  describe('When testing calculateEmission', () => {
    it('Should correctly return the passed emission value * the correctionFactor * the emission', () => {
      const mockEmissionFactor = 2;
      const mockCorrectionFactor = 3;
      const emissionValue = 1;

      const emission = calculateEmission({ emissionValue, emissionFactor: mockEmissionFactor, correctionFactor: mockCorrectionFactor });

      const expectedResult = emissionValue * mockCorrectionFactor * mockEmissionFactor;

      expect(emission).toEqual(expectedResult);
    });
  });
});
