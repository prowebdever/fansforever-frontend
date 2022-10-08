import Select, { OptionTypeBase } from 'react-select';
import styled from 'styled-components';
import { useField } from 'formik';

import FlexColumnWrapper from '../common/FlexColumnWrapper';

const FormFieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;

  label {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  .error {
    margin-top: 4px;
    color: #ff3465;
  }
`;

interface Trc20SelectFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: OptionTypeBase[];
}

export const Trc20SelectFormField: React.VFC<Trc20SelectFormFieldProps> = ({
  label,
  options,
  name,
  placeholder,
}) => {
  const [field, meta, { setValue }] = useField({ name });

  return (
    <FormFieldWrapper>
      <FlexColumnWrapper>
        <label htmlFor={field.name}>{label}</label>
        <Select
          {...field}
          placeholder={placeholder}
          options={options}
          value={options.find(
            (option: OptionTypeBase) => option.value === field.value
          )}
          onChange={(option) => setValue(option?.value || null)}
          onBlur={field.onBlur}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </FormFieldWrapper>
  );
};
