import { getAllCategories } from '@src/services/emissions';

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
});
