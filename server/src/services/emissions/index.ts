import { EmissionSourcesEntity, IEmissionCategory } from '@src/interfaces/categories';
import { categories } from './categories';
import { emissionSources } from './emissionSources';

export const getEmissionFactor = (emissionSource: string) => {
  if (emissionSource) return 0.41;

  return 0.41;
};

export const getCorrectionFactor = (emissionSource: string) => {
  if (emissionSource) return 1;

  return 1;
};

const getEmissionSourceFromId = (id: number): EmissionSourcesEntity => {
  const emissionSource = emissionSources.find((source) => source.id === id);

  if (!emissionSource) {
    throw new Error(`Emission source with id ${id} not found`);
  }

  return emissionSource;
};

export const getAllCategories = (): IEmissionCategory[] => {
  const transformedEmissionCategory = categories.map((category) => ({
    title: category.title,
    emissionSources: category.emissionSourceIds.map((id) => getEmissionSourceFromId(id)),
  }));

  return transformedEmissionCategory;
};

export const calculateEmission = (emissionSource: string, value: number) => {
  const emissionFactor = getEmissionFactor(emissionSource);

  // some emission types need some sort of correction
  // wether it is to account for non-direct emissions or
  // to transform the received unit to the expected one
  const correctionFactor = getCorrectionFactor(emissionSource);
  return emissionFactor * correctionFactor * value;
};
