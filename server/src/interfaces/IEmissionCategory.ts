import { IEmissionSourcesEntity } from './IEmissionSource';

export interface IRawEmissionCategory {
  title: string;
  emissionSourceIds: number[];
}

export interface IEmissionCategory {
    title: string;
    emissionSources: IEmissionSourcesEntity[];
}
