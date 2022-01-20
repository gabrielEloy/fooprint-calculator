interface EmissionSourcesEntity {
    title: string;
    unit: string;
  }

export interface IEmissionCategory {
    title: string;
    emissionSources: EmissionSourcesEntity[];
}
