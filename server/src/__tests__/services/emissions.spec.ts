import {
  getAllCategories, getCorrectionFactor, getEmissionFactor, calculateEmission,
} from '@src/services/emissions/index';
import * as correctionFactors from '../../../src/services/emissions/data/correctionFactors';
import * as emissionFactors from '../../../src/services/emissions/data/emissionFactors';

jest.mock('../../../src/services/emissions/data/correctionFactors');
jest.mock('../../../src/services/emissions/data/emissionFactors');

const mockCorrectionFactors = correctionFactors as jest.Mocked<typeof correctionFactors>;
const mockEmissionFactors = emissionFactors as jest.Mocked<typeof emissionFactors>;

describe('Emissions service test', () => {
  describe('When testing getAllCategories', () => {
    const mockCategories = [{
      id: 1,
      title: 'Test',
      emissionSourceIds: [],
    },
    {
      id: 2,
      title: 'Test_2',
      emissionSourceIds: [],
    }];
    it('Should correctly return all available categories ', () => {
      const expectedResponse = [{
        id: 1,
        title: 'Test',
        emissionSources: [],
      }, {
        id: 2,
        title: 'Test_2',
        emissionSources: [],
      }];

      expect(getAllCategories(mockCategories)).toEqual(expectedResponse);
    });
  });

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
