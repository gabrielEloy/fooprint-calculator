import { IRawEmissionCategory } from '@src/interfaces/IEmissionCategory';

const housing = {
  title: 'Housing',
  emissionSourceIds: [1, 2, 3, 4, 5, 6],
};

const travel = {
  title: 'Travel',
  emissionSourceIds: [7, 8, 9, 10, 11, 12],
};

export const categories: IRawEmissionCategory[] = [
  housing,
  travel,
];
