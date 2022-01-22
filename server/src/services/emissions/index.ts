import { IEmissionCategory, IRawEmissionCategory } from '@src/interfaces/IEmissionCategory';
import { IEmissionSourcesEntity } from '@src/interfaces/IEmissionSource';
import { categories } from './data/categories';
import { DEFAULT_CORRECTION_FACTOR, getAllCorrectionFactors } from './data/correctionFactors';
import { getAllEmissionFactors } from './data/emissionFactors';
import { getAllEmissionSources } from './data/emissionSources';

export const getEmissionFactor = (emissionSourceId: number): number => {
  const emissionFactors = getAllEmissionFactors();
  const emissionFactor = emissionFactors.find((factor) => factor.emissionSourceId === emissionSourceId);

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

export const getEmissionSourceFromId = (id: number): IEmissionSourcesEntity => {
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

interface ICalculatedEmissionArgs {emissionValue: number; emissionFactor: number; correctionFactor: number;}

export const calculateEmission = ({ emissionValue, correctionFactor, emissionFactor }: ICalculatedEmissionArgs) => emissionFactor * correctionFactor * emissionValue;
