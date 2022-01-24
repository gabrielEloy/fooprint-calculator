import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUseEmissions, IEmissionCategory, ICalculateEmissionResponse } from '../interfaces/useEmissions';

export function useEmissions(): IUseEmissions {
  const [emissions, setEmissions] = useState<IEmissionCategory[]>([]);

  const emissionsBaseUrl = process.env.REACT_APP_EMISSIONS_BASE_URL;

  const getEmissionCategories = async () => {
    const { data } = await axios.get<IEmissionCategory[]>(`${emissionsBaseUrl}/categories`);
    return data;
  };

  const calculateEmission = async (id: number, value: number) => {
    const { data } = await axios.get<ICalculateEmissionResponse>(`${emissionsBaseUrl}/calculate`, {
      params: {
        emissionSourceId: id,
        value,
      },
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
