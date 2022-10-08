import styled from 'styled-components';
import { useField } from 'formik';

import Toggle from '../Toggle';

import FlexColumnWrapper from '../common/FlexColumnWrapper';
import FlexRowWrapper from '../common/FlexRowWrapper';

const InstantSalePriceFormFieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;

  label {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.textColors.primary};
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  input {
    padding-bottom: 18px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.textColors.primary};
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary}99;

    ::placeholder {
      color: ${({ theme }) => theme.textColors.secondary};
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.textColors.secondary};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.textColors.secondary};
    }
  }

  .error {
    margin-top: 4px;
    color: ${({ theme }) => theme.accentColors.primary};
  }
`;

interface InstantPriceFormFieldProps {
  name: string;
  placeholder: string;
  label: string;
  style: {};
  isToggleOn: boolean;
  setIsToggleOn: (value: boolean) => boolean;
}

const InstantSalePriceFormField: React.VFC<InstantPriceFormFieldProps> = ({
  name,
  placeholder,
  label,
  style,
  isToggleOn,
  setIsToggleOn,
}) => {
  const [field, meta, { setValue }] = useField({ name });

  return (
    <InstantSalePriceFormFieldWrapper style={style}>
      <FlexColumnWrapper>
        <FlexRowWrapper style={{ justifyContent: 'space-between' }}>
          <label htmlFor={field.name}>{label}</label>
          <Toggle
            isToggleOn={isToggleOn}
            onClick={() => {
              if (isToggleOn) {
                setValue('', false);
              }
              setIsToggleOn(!isToggleOn);
            }}
          />
        </FlexRowWrapper>
        <input
          id={field.name}
          type="text"
          {...field}
          placeholder={placeholder}
          readOnly={!isToggleOn}
          autoComplete="off"
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </InstantSalePriceFormFieldWrapper>
  );
};

export default InstantSalePriceFormField;
