import { getAllCategories } from '@src/services/emissions/index';

describe('Emissions service test', () => {
  describe('When testing getAllCategories', () => {
    afterEach(() => {
      jest.resetModules();
    });
    it('Should correctly return all available categories ', () => {
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
