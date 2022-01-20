import { EmissionSourcesEntity, IEmissionCategory } from '@src/interfaces/categories';
import { categories } from './categories';
import { correctionFactors } from './correctionFactors';
import { emissionFactors } from './emissionFactors';
import { emissionSources } from './emissionSources';

export const getEmissionFactor = (emissionSourceId: number): number => {
  const emissionFactor = emissionFactors.find(({ id }) => id === emissionSourceId);

  if (!emissionFactors) {
    throw new Error(`Emission factor with id ${emissionSourceId} not found`);
  }

  return emissionFactor!.value;
};

export const getCorrectionFactor = (emissionSource: number) => {
  const correctionFactor = correctionFactors
    .find(({ emissionSourceId }) => emissionSourceId === emissionSource);

  if (!correctionFactor) {
    return 1;
  }

  return correctionFactor.value;
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

export const calculateEmission = (emissionSource: number, value: number) => {
  const emissionFactor = getEmissionFactor(emissionSource);

  // some emission types need some sort of correction
  // wether it is to account for non-direct emissions or
  // to transform the received unit to the expected one
  const correctionFactor = getCorrectionFactor(emissionSource);
  return emissionFactor * correctionFactor * value;
};
