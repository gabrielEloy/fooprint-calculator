import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUseEmissions, IEmissions, ICalculateEmissionResponse } from '../interfaces/useEmissions';

export function useEmissions(): IUseEmissions {
  const [emissions, setEmissions] = useState<IEmissions[]>([]);

  const emissionsBaseUrl = process.env.REACT_APP_EMISSIONS_BASE_URL;

  const getEmissionCategories = async () => {
    const { data } = await axios.get(`${emissionsBaseUrl}/emissions/categories`);
    return data as IEmissions[];
  };

  const calculateEmission = async (id: number, value: number) => {
    const { data } = await axios.post<ICalculateEmissionResponse>(`${emissionsBaseUrl}/emissions/calculate`, {
      emissionSource: id,
      value,
    });

    return data;
  };

  useEffect(() => {
    getEmissionCategories().then((em) => setEmissions(em));
  }, []);

  return {
    emissions,
    calculateEmission,
  };
}
