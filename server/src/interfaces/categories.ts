export interface EmissionSourcesEntity {
  id: number;
  title: string;
  unit: string;
}

export interface IRawEmissionCategory {
  title: string;
  emissionSourceIds: number[];
}

export interface IEmissionCategory {
    title: string;
    emissionSources: EmissionSourcesEntity[];
}
