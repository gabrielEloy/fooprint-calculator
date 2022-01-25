import {
  Card, Spin,
} from 'antd';
import {
  useState, useEffect, useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import { BaseLayout } from '../../components/BaseLayout';
import { useEmissions } from '../../hooks/useEmissions';
import { IAnyObject } from '../../interfaces/objects';
import { IEmissionSource } from '../../interfaces/useEmissions';
import { sumObjectValues } from '../../services/objects';
import CalculateEmissionStyles, { LoaderContainer } from './CalculateEmissionStyles';
import { CalculationsContainer } from './components/CalculationsContainer';

export function CalculateEmissions() {
  const [selectedEmissionCategory, setselectedEmissionCategory] = useState<number>();
  const [emissionResults, setEmissionResults] = useState<IAnyObject>({});
  const [formValues, setFormValues] = useState<IAnyObject>({});
  const { isLoading, emissions, calculateEmission } = useEmissions();

  const currentCategory = emissions.find((e) => e.id === selectedEmissionCategory);
  const totalEmissions = sumObjectValues(emissionResults).toFixed(2);

  const generateInitialFormValues = (emissionSources: IEmissionSource[]) => {
    const newFormValues: IAnyObject = {};
    emissionSources.forEach(({ id }) => {
      newFormValues[String(id)] = 0;
    });

    return newFormValues;
  };

  useEffect(() => {
    if (currentCategory) {
      const newFormValues: IAnyObject = generateInitialFormValues(currentCategory.emissionSources);
      setFormValues(newFormValues);
    }
  }, [currentCategory]);

  const resetEmissionResults = () => setEmissionResults({});

  useEffect(() => {
    resetEmissionResults();
  }, [selectedEmissionCategory]);

  const handleCalculateEmission = async (id: number, value: string) => {
    const parsedValue = Number(value);

    if (!parsedValue) {
      setEmissionResults({ ...emissionResults, [String(id)]: 0 });
    }

    const { emission } = await calculateEmission(id, parsedValue);
    setEmissionResults({ ...emissionResults, [String(id)]: emission });
  };

  const debouncedCalculateEmission = useCallback(
    debounce((id, value) => handleCalculateEmission(id, value), 300),
    [emissionResults],
  );

  const handleSelectEmissionCategory = (id: number) => {
    setselectedEmissionCategory(id);
  };

  const handleInputChange = (value: number, id: number) => {
    setFormValues({
      ...formValues,
      [String(id)]: value,
    });

    debouncedCalculateEmission(id, value);
  };

  return (
    <CalculateEmissionStyles>
      <BaseLayout>
        <Card className="calculate-emission-container" title="Calculate emissions">
          <div className="card-content">
            {isLoading ? (
              <LoaderContainer>
                <div>
                  <span>loading</span>
                  <Spin />
                </div>
              </LoaderContainer>
            ) : (
              <>
                {' '}
                <div className="calculations-container">
                  <CalculationsContainer
                    formValues={formValues}
                    handleInputChange={handleInputChange}
                    currentCategory={currentCategory}
                    emissions={emissions}
                    selectedEmissionCategory={selectedEmissionCategory}
                    handleSelectEmissionCategory={handleSelectEmissionCategory}
                  />
                </div>
                <div className="results-container">
                  <h2>
                    Total emissions:
                    {' '}
                    {totalEmissions}
                  </h2>
                </div>
              </>
            )}
          </div>
        </Card>
      </BaseLayout>
    </CalculateEmissionStyles>
  );
}
