import { getAllCategories } from '@src/services/emissions';
import * as categories from '@src/services/emissions/data/categories';

jest.mock('@src/services/emissions/data/categories');

const mockCategoriesModule = categories as jest.Mocked<typeof categories>;

describe('Emissions service test', () => {
  describe('When testing getAllCategories', () => {
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

      mockCategoriesModule.getCategories.mockImplementationOnce(() => mockCategories);

      const expectedResponse = [{
        id: 1,
        title: 'Test',
        emissionSources: [],
      }, {
        id: 2,
        title: 'Test_2',
        emissionSources: [],
      }];

      expect(getAllCategories()).toEqual(expectedResponse);
    });
  });
});
