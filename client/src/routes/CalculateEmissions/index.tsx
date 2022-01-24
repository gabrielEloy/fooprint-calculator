import {
  Card, Input, Select,
} from 'antd';
import { useState, ChangeEvent, useEffect } from 'react';
import { BaseLayout } from '../../components/BaseLayout';
import { useEmissions } from '../../hooks/useEmissions';
import { IAnyObject } from '../../interfaces/objects';
import { IEmissionSource } from '../../interfaces/useEmissions';
import { sumObjectValues } from '../../services/objects';
import CalculateEmissionStyles, { InputContainer } from './styles';

const { Option } = Select;

export function CalculateEmissions() {
  const [selectedEmissionSource, setSelectedEmissionSource] = useState<number>();
  const [emissionResults, setEmissionResults] = useState<IAnyObject>({});
  const [formValues, setFormValues] = useState<IAnyObject>({});
  const { emissions, calculateEmission } = useEmissions();

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

  const handleCalculateEmission = async (id: number) => {
    const value = formValues[String(id)];

    const { emission } = await calculateEmission(id, value);
    setEmissionResults({ ...emissionResults, [String(id)]: emission });
  };

  const handleSelectChange = (id: number) => {
    setSelectedEmissionSource(id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CalculateEmissionStyles>
      <BaseLayout>
        <Card className="calculate-emission-container" title="Calculate emissions">
          <div className="card-content">
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
                  <Input className="antd-input" value={formValues[String(id)] || ''} onBlur={() => handleCalculateEmission(id)} onChange={handleInputChange} name={String(id)} />
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

          </div>
        </Card>
      </BaseLayout>
    </CalculateEmissionStyles>
  );
}
