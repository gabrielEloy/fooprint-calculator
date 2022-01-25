import { sumObjectValues } from '../../services/objects';

describe('When testing sumObjectValues', () => {
  it('Should correctly sum numeric objects', () => {
    const testedObj = {
      a: 1,
      b: 2.32,
      c: 9.99,
    };

    const sum = sumObjectValues(testedObj);

    expect(sum).toEqual(13.31);
  });
});
