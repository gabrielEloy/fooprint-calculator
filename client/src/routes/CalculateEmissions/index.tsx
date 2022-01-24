import {
  Card, Input, Select, Spin,
} from 'antd';
import React, {
  useState, ChangeEvent, useEffect, useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import { BaseLayout } from '../../components/BaseLayout';
import { useEmissions } from '../../hooks/useEmissions';
import { IAnyObject } from '../../interfaces/objects';
import { IEmissionSource } from '../../interfaces/useEmissions';
import { sumObjectValues } from '../../services/objects';
import CalculateEmissionStyles, { InputContainer, LoaderContainer } from './styles';

const { Option } = Select;

export function CalculateEmissions() {
  const [selectedEmissionSource, setSelectedEmissionSource] = useState<number>();
  const [emissionResults, setEmissionResults] = useState<IAnyObject>({});
  const [formValues, setFormValues] = useState<IAnyObject>({});
  const { isLoading, emissions, calculateEmission } = useEmissions();

  const currentCategory = selectedEmissionSource && emissions.find((e) => e.id === selectedEmissionSource);
  const totalEmissions = sumObjectValues(emissionResults).toFixed(2);

  const generateInitialFormValues = (emissionSources: IEmissionSource[]) => {
    const newFormValues: IAnyObject = {};
    emissionSources.forEach(({ id }) => {
      newFormValues[String(id)] = '0';
    });

    return newFormValues;
  };

  useEffect(() => {
    if (currentCategory) {
      const newFormValues: IAnyObject = generateInitialFormValues(currentCategory.emissionSources);
      setFormValues(newFormValues);
    }
  }, [currentCategory]);

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

  const handleSelectChange = (id: number) => {
    setSelectedEmissionSource(id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    debouncedCalculateEmission(Number(e.target.name), e.target.value);
  };

  return (
    <CalculateEmissionStyles>
      <BaseLayout>
        <Card className="calculate-emission-container" title="Calculate emissions">
          <div className="card-content">
            {isLoading ? (<LoaderContainer><Spin /></LoaderContainer>) : (
              <>
                {' '}
                <div className="calculations-container">
                  <InputContainer>
                    <h3>Emission category:</h3>
                    <Select placeholder="Select an emission category" className="antd-select" value={selectedEmissionSource} onChange={handleSelectChange}>
                      {emissions.map(({ id, title }) => (<Option key={`${id}-${title}`} value={id}>{title}</Option>))}
                    </Select>
                  </InputContainer>
                  {currentCategory && currentCategory.emissionSources.map(({ id, title, unit }) => (
                    <InputContainer key={`${id}-${title}`}>
                      <h3>
                        {title}
                        :
                      </h3>
                      <Input className="antd-input" value={formValues[String(id)] || ''} onChange={handleInputChange} name={String(id)} />
                      <div className="span-container">
                        <span>{unit}</span>
                      </div>
                    </InputContainer>
                  ))}
                </div>
                <div className="results-container">
                  <h2>Total emissions:</h2>
                  <span>{totalEmissions}</span>
                </div>
              </>
            )}
          </div>
        </Card>
      </BaseLayout>
    </CalculateEmissionStyles>
  );
}
