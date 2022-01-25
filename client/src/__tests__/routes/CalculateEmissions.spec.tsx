import {
  render, screen, waitFor, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react';
import { CalculateEmissions } from '../../routes/CalculateEmissions';
import emissionCategoriesMock from '../mocks/emissionCategories.json';
import { rest, server } from '../../testServer';
import { formatEmissions } from '../../services/formatters';

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

      const expectedInitialValue = formatEmissions(0);

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
      fireEvent.click(emissionSourceOption);

      await screen.findByText(`${mockEmissionCategory.emissionSources[0].title}:`);

      let emissionSourceFields = 0;

      // using findByText because if the text is not found, it will throw an error
      mockEmissionCategory.emissionSources.forEach(({ title, unit }) => {
        screen.getByText(`${title}:`);
        screen.getByText(unit);
        emissionSourceFields += 1;
      });

      expect(emissionSourceFields).toEqual(mockEmissionCategory.emissionSources.length);
    });
  });
  describe('When calculating a single emission', () => {
    it('It should propagate the value returned by the API', async () => {
      server.use(
        rest.get('http://localhost:4000/calculate', (_req, res, ctx) => res(ctx.status(200), ctx.json({ emission: 12.23 }))),
      );
      render(<CalculateEmissions />);

      await waitFor(() => screen.getByText(/Emission category:/i));
      const select = screen.getByText(/Select an emission category/i);
      const mockEmissionCategory = emissionCategoriesMock[0];

      // opening select
      fireEvent.mouseDown(select);

      const emissionSourceOption = screen.getByText(mockEmissionCategory.title);

      // selecting emission source
      fireEvent.click(emissionSourceOption);

      const { title } = mockEmissionCategory.emissionSources[0];

      const placeholder = `Enter ${title} consumption`;

      const input = screen.getByPlaceholderText(placeholder);
      fireEvent.change(input, { target: { value: '12' } });

      const calculationResult = await screen.findByText(`Total emissions: ${formatEmissions(12.23)}`);
      expect(calculationResult).not.toBeNull();
    });
  });
  describe('When calculating multiple emissions at once', () => {
    it('Should sum the values returned by the api', async () => {
      const mockEmissionsResponse = 12.23;

      server.use(
        rest.get('http://localhost:4000/calculate', (_req, res, ctx) => res(ctx.status(200), ctx.json({ emission: mockEmissionsResponse }))),
      );

      render(<CalculateEmissions />);

      await waitFor(() => screen.getByText(/Emission category:/i));
      const select = screen.getByText(/Select an emission category/i);
      const mockEmissionCategory = emissionCategoriesMock[0];

      // opening select
      fireEvent.mouseDown(select);

      const emissionSourceOption = screen.getByText(mockEmissionCategory.title);

      // selecting emission source
      fireEvent.click(emissionSourceOption);

      const { title: firstEmissionTitle } = mockEmissionCategory.emissionSources[0];
      const { title: secondEmissionTitle } = mockEmissionCategory.emissionSources[1];

      const getEmissionPlaceholder = (emissionTitle: string) => `Enter ${emissionTitle} consumption`;

      fireEvent.change(
        screen.getByPlaceholderText(getEmissionPlaceholder(firstEmissionTitle)),
        { target: { value: '12' } },
      );

      const firstCalculationRestul = await screen.findByText(`Total emissions: ${formatEmissions(mockEmissionsResponse)}`);
      expect(firstCalculationRestul).not.toBeNull();

      fireEvent.change(
        screen.getByPlaceholderText(getEmissionPlaceholder(secondEmissionTitle)),
        { target: { value: '12' } },
      );

      const calculationResult = await screen.findByText(`Total emissions: ${formatEmissions(mockEmissionsResponse * 2)}`);
      expect(calculationResult).not.toBeNull();
    });
  });
});
