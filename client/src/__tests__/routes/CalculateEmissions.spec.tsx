import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { CalculateEmissions } from '../../routes/CalculateEmissions';
import emissionCategoriesMock from '../mocks/emissionCategories.json';

describe('Testing the calculate emissions route', () => {
  test('It should correctly render the component', async () => {
    render(<CalculateEmissions />);
    const linkElement = screen.getAllByText(/footprint calculator/i);
    expect(linkElement.length).toEqual(2);

    // waiting for load to finish so jest does not throw an error
    await waitFor(() => screen.getByText(/Emission category:/i));
  });

  describe('When testing initial state', () => {
    it('Should Start with loading', async () => {
      render(<CalculateEmissions />);
      const loadingElement = await screen.findByText(/loading/i);

      expect(loadingElement).not.toBeNull();

      // waiting for load to finish so jest does not throw an error
      await waitFor(() => screen.getByText(/Emission category:/i));
    });
    it('Should correctly display emission select and total emissions', async () => {
      render(<CalculateEmissions />);

      await waitFor(() => screen.getByText(/Emission category:/i));

      const emissionCategorySelectLabel = screen.getByText(/Emission category:/i);
      const totalEmissionsLabel = screen.getByText(/Total emissions:/i);

      expect(emissionCategorySelectLabel).not.toBeNull();
      expect(totalEmissionsLabel).not.toBeNull();
    });
    it('Should initialize the total value of emissions at zero', async () => {
      render(<CalculateEmissions />);

      const expectedInitialValue = (0).toFixed(2);

      await waitFor(() => screen.getByText(/Emission category:/i));

      const totalEmissionsLabel = screen.getByText(`Total emissions: ${expectedInitialValue}`);

      expect(totalEmissionsLabel).not.toBeNull();
    });
    it('Should correctly display all emission categories returned by the api', async () => {
      render(<CalculateEmissions />);

      await waitFor(() => screen.getByText(/Emission category:/i));
      const select = screen.getByText(/Select an emission category/i);
      fireEvent.mouseDown(select);

      // using findByText because if the text is not found, it will throw an error
      const emissionOptions = await Promise.all(emissionCategoriesMock.map(({ title }) => screen.findByText(title)));

      expect(emissionOptions.length).toEqual(emissionCategoriesMock.length);
    });
  });
  describe('When interacting with state', () => {
    it('Should show emissions sources when a emission category is selected', async () => {
      render(<CalculateEmissions />);

      await waitFor(() => screen.getByText(/Emission category:/i));
      const select = screen.getByText(/Select an emission category/i);
      const mockEmissionCategory = emissionCategoriesMock[0];

      // opening select
      fireEvent.mouseDown(select);

      const emissionSourceOption = screen.getByText(mockEmissionCategory.title);

      // selecting emission source
      fireEvent.mouseDown(emissionSourceOption);

      let emissionSourceFields = 0;

      // using findByText because if the text is not found, it will throw an error
      mockEmissionCategory.emissionSources.forEach(({ title, unit }) => {
        screen.findByText(title);
        screen.findByText(unit);
        emissionSourceFields += 1;
      });

      expect(emissionSourceFields).toEqual(mockEmissionCategory.emissionSources.length);
    });
  });
});
