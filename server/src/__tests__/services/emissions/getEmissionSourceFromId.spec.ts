import { getEmissionSourceFromId } from '@src/services/emissions/index';
import * as emissionSources from '@src/services/emissions/data/emissionSources';

jest.mock('@src/services/emissions/data/emissionSources');

const mockEmissionFactors = emissionSources as jest.Mocked<typeof emissionSources>;

describe('Emissions service test', () => {
  describe('When testing calculateEmission', () => {
    it('Should correctly return the passed emission value * the correctionFactor * the emission', () => {
      const expectedEmissionSource = {
        id: 2,
        title: 'test source title',
        unit: 'tests/year',
      };

      mockEmissionFactors.getAllEmissionSources.mockImplementationOnce(() => [expectedEmissionSource]);
      const emissionSource = getEmissionSourceFromId(expectedEmissionSource.id);

      expect(emissionSource).toEqual(expectedEmissionSource);
    });

    it('Should throw an error  when the queried emission source is not found', () => {
      const queriedId = 5;

      const expectedEmissionSource = {
        id: 2,
        title: 'test source title',
        unit: 'tests/year',
      };

      mockEmissionFactors.getAllEmissionSources.mockImplementationOnce(() => [expectedEmissionSource]);

      expect(() => {
        getEmissionSourceFromId(queriedId);
      }).toThrow(`Emission source with id ${queriedId} not found`);
    });
  });
});
