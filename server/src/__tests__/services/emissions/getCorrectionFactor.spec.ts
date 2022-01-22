import { getCorrectionFactor } from '@src/services/emissions';
import * as correctionFactors from '@src/services/emissions/data/correctionFactors';

jest.mock('@src/services/emissions/data/correctionFactors');

const mockCorrectionFactors = correctionFactors as jest.Mocked<typeof correctionFactors>;

describe('Emissions service test', () => {
  describe('When testing getCorrectionFactor', () => {
    it('Should successfully return a correction factor when it is found', () => {
      const queriedCorrectionFactor = 6;
      const expectedCorrectionFactor = 33;

      mockCorrectionFactors.getAllCorrectionFactors.mockImplementationOnce(() => [{
      // the original unit is in kg/day. We need to convert it to kg/year
      // so, we multiply the emission value by 365
        id: 1,
        emissionSourceId: queriedCorrectionFactor,
        value: expectedCorrectionFactor,
      }]);

      const correctionFactor = getCorrectionFactor(queriedCorrectionFactor);
      expect(correctionFactor).toEqual(expectedCorrectionFactor);
    });
    it('Should successfully return the DEFAULT_CORRECTION_FACTOR when a correction factor is not found', () => {
      const queriedCorrectionFactor = 6;
      const expectedCorrectionFactor = correctionFactors.DEFAULT_CORRECTION_FACTOR;

      mockCorrectionFactors.getAllCorrectionFactors.mockImplementationOnce(() => [{
      // the original unit is in kg/day. We need to convert it to kg/year
      // so, we multiply the emission value by 365
        id: 1,
        emissionSourceId: 4,
        value: 999,
      }]);

      const correctionFactor = getCorrectionFactor(queriedCorrectionFactor);
      expect(correctionFactor).toEqual(expectedCorrectionFactor);
    });
  });
});
