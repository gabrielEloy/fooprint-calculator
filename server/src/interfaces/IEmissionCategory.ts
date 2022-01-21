import { IEmissionSourcesEntity } from './IEmissionSource';

export interface IRawEmissionCategory {
  id: number;
  title: string;
  emissionSourceIds: number[];
}

export interface IEmissionCategory {
    title: string;
    emissionSources: IEmissionSourcesEntity[];
}
