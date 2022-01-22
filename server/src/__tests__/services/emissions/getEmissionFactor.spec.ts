import { getEmissionFactor } from '@src/services/emissions';
import * as emissionFactors from '@src/services/emissions/data/emissionFactors';

jest.mock('@src/services/emissions/data/emissionFactors');

const mockEmissionFactors = emissionFactors as jest.Mocked<typeof emissionFactors>;

describe('Emissions service test', () => {
  describe('When testing getEmissionFactor', () => {
    it('Should return the correct value for the queried emission factor when it exists', () => {
      const queriedEmissionSourceId = 12;
      const expectedValue = 0.543;

      mockEmissionFactors.getAllEmissionFactors.mockImplementationOnce(() => [{
        id: 12,
        emissionSourceId: queriedEmissionSourceId,
        value: expectedValue,
      }]);

      const emissionFactor = getEmissionFactor(queriedEmissionSourceId);
      expect(expectedValue).toEqual(emissionFactor);
    });
    it('Should throw an error  when the queried emission factor is not found', () => {
      const queriedEmissionSourceId = 12;
      const expectedValue = 0.543;

      mockEmissionFactors.getAllEmissionFactors.mockImplementationOnce(() => [{
        id: 12,
        emissionSourceId: 2,
        value: expectedValue,
      }]);

      expect(() => {
        getEmissionFactor(queriedEmissionSourceId);
      }).toThrow(`Emission factor with id ${queriedEmissionSourceId} not found`);
    });
  });
});
