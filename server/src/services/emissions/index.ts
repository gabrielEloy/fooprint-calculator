import { IEmissionCategory } from '@src/interfaces/categories';
import { housingCategory, travelCategory } from './categories';

export const getEmissionFactor = (emissionSource: string) => {
  if (emissionSource) return 0.41;

  return 0.41;
};

export const getCorrectionFactor = (emissionSource: string) => {
  if (emissionSource) return 1;

  return 1;
};

export const getAllCategories = (): IEmissionCategory[] => [
  housingCategory,
  travelCategory,
];

export const calculateEmission = (emissionSource: string, value: number) => {
  const emissionFactor = getEmissionFactor(emissionSource);

  // some emission types need some sort of correction
  // wether it is to account for non-direct emissions or
  // to transform the received unit to the expected one
  const correctionFactor = getCorrectionFactor(emissionSource);

  return emissionFactor * correctionFactor * value;
};
