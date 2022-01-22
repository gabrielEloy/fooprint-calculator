import { getAllCategories, getCorrectionFactor } from '@src/services/emissions/index';
import { getAllCorrectionFactors } from '../../../src/services/emissions/data/correctionFactors';
// import {} from '../../../src/services/emissions/data/correctionFactors';
// import * as correctionFactors from '@src/services/emissions/data/correctionFactors';

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
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it('Should successfully return a correction factor when it is found', () => {
      jest.mock('../../../src/services/emissions/data/correctionFactors', () => ({
        getAllCorrectionFactors: jest.fn().mockReturnValue([{
          // the original unit is in kg/day. We need to convert it to kg/year
          // so, we multiply the emission value by 365
          id: 1,
          emissionSourceId: 6,
          value: 33,
        }]),
      }));

      // const mockCorrectionFactors = correctionFactors as jest.Mocked<typeof correctionFactors>;
      // @ts-ignore
      // mockCorrectionFactors.correctionFactors = [{
      //   id: 1,
      //   emissionSourceId: 6,
      //   value: 33,
      // }];

      const correctionFactor = getCorrectionFactor(6);
      expect(correctionFactor).toEqual(33);
    });
    it('Should successfully return the DEFAULT_CORRECTION_FACTOR when a correction factor is not found', () => {

    });
  });
});
