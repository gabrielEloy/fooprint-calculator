import { formatEmissions } from '../../services/formatters';

describe('When testing formatEmissions', () => {
  it('Should return the number with two decimal places when testing an int', () => {
    const transformedValue = 2131321;
    expect(formatEmissions(transformedValue)).toEqual(transformedValue.toFixed(2));
  });
  it('Should return the number with two decimal places when testing a float', () => {
    const transformedValue = 12.2312423;
    expect(formatEmissions(transformedValue)).toEqual(transformedValue.toFixed(2));
  });
});
