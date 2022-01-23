import axios from 'axios';


export function useEmissions(){
    const emissionsBaseUrl = process.env.REACT_APP_EMISSIONS_BASE_URL;

    const getEmissionCategories = async () => {
        const { data } = await axios.get(`${emissionsBaseUrl}/emissions/categories`);
        return data;
    }


    return {
        getEmissionCategories
    }
}