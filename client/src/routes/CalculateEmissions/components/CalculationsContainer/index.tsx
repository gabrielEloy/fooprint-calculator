import {
  InputNumber, Select,
} from 'antd';
import { IAnyObject } from '../../../../interfaces/objects';
import { IEmissionCategory } from '../../../../interfaces/useEmissions';
import { InputContainer } from './CalculationsContainerStyles';

const { Option } = Select;

interface ICalculationsContainerProps {
    formValues: IAnyObject;
    handleInputChange: (value: number, id: number) => void;
    currentCategory: IEmissionCategory | undefined;
    emissions: IEmissionCategory[]
    selectedEmissionCategory: number | undefined;
    handleSelectEmissionCategory: (id: number) => void;
}

export function CalculationsContainer({
  formValues, handleInputChange, currentCategory, emissions, selectedEmissionCategory, handleSelectEmissionCategory,
}: ICalculationsContainerProps) {
  return (
    <>
      <InputContainer>
        <h3>Emission category:</h3>
        <Select placeholder="Select an emission category" className="antd-select" value={selectedEmissionCategory} onChange={handleSelectEmissionCategory}>
          {emissions.map(({ id, title }) => (<Option key={`${id}-${title}`} value={id}>{title}</Option>))}
        </Select>
      </InputContainer>

      { currentCategory && currentCategory.emissionSources.map(({ id, title, unit }) => (
        <InputContainer key={`${id}-${title}`}>
          <h3>
            {title}
            :
          </h3>
          <InputNumber className="antd-input" value={formValues[String(id)]} min={0} onChange={(value) => handleInputChange(value, id)} name={String(id)} />
          <div className="span-container">
            <span>{unit}</span>
          </div>
        </InputContainer>
      )) }
    </>
  );
}
