import { IEmissionCategory, IRawEmissionCategory } from '@src/interfaces/IEmissionCategory';
import { IEmissionSourcesEntity } from '@src/interfaces/IEmissionSource';
import { categories } from './data/categories';
import { DEFAULT_CORRECTION_FACTOR, getAllCorrectionFactors } from './data/correctionFactors';
import { getAllEmissionFactors } from './data/emissionFactors';
import { getAllEmissionSources } from './data/emissionSources';

export const getEmissionFactor = (emissionSourceId: number): number => {
  const emissionFactors = getAllEmissionFactors();
  const emissionFactor = emissionFactors.find(({ id }) => id === emissionSourceId);

  if (!emissionFactor) {
    throw new Error(`Emission factor with id ${emissionSourceId} not found`);
  }

  return emissionFactor!.value;
};

export const getCorrectionFactor = (emissionSource: number) => {
  const correctionFactors = getAllCorrectionFactors();

  const correctionFactor = correctionFactors
    .find(({ emissionSourceId }) => emissionSourceId === emissionSource);

  if (!correctionFactor) {
    return DEFAULT_CORRECTION_FACTOR;
  }

  return correctionFactor.value;
};

const getEmissionSourceFromId = (id: number): IEmissionSourcesEntity => {
  const emissionSources = getAllEmissionSources();
  const emissionSource = emissionSources.find((source) => source.id === id);

  if (!emissionSource) {
    throw new Error(`Emission source with id ${id} not found`);
  }

  return emissionSource;
};

export const getAllCategories = (availableCategories:IRawEmissionCategory[] = categories): IEmissionCategory[] => {
  const transformedEmissionCategory = availableCategories.map((category) => ({
    id: category.id,
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
