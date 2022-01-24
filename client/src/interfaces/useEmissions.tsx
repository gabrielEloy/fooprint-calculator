export interface IEmissionSource {
    id: number;
    title: string;
    unit: string;
}

export interface IEmissions {
    id: number;
    title: string;
    emissionSources: IEmissionSource[]
  }

export interface ICalculateEmissionResponse {
    emission: number;
    unit: string;
  }

export interface IUseEmissions{
    emissions: IEmissions[]
    calculateEmission: (id: number, value: number) => Promise<ICalculateEmissionResponse>
  }
