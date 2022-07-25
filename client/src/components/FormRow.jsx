import React from 'react';
import styled from 'styled-components';

const FormRow = ({
  labelText,
  name,
  value,
  type,
  onChange,
  min,
  max,
  step,
  exampleText,
}) => {
  return (
    <Wrapper>
      <Label>{labelText}</Label>
      {exampleText && <Example>{exampleText}</Example>}

      <Input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </Wrapper>
  );
};

export default FormRow;

const Wrapper = styled.div``;
const Label = styled.h3`
  color: var(--clr-primary-2);
`;
const Input = styled.input`
  margin-top: -2rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 100%;
  line-height: 1.15;
  width: 100%;
  font-weight: 500;
`;

const Example = styled.p`
  color: var(--clr-gray-4);
`;
