import * as React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import FlexColumnWrapper from '../common/FlexColumnWrapper';

const FormTextAreaFieldWrapper = styled.div`
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

  textarea {
    resize: vertical;
    min-height: 95px;
    padding-bottom: 18px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.textColors.primary};
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary}99;

    &:active,
    &:focus {
      background: none;
    }

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

interface FormTextAreaFieldProps {
  label: string;
  name: string;
  style?: {};
  validate?: (value: string) => Promise<any>;
}

const FormTextAreaField: React.VFC<
  FormTextAreaFieldProps & React.HTMLAttributes<HTMLTextAreaElement>
> = ({ label, name, style, validate, ...props }) => {
  const [field, meta] = useField({ name, ...(validate && { validate }) });
  return (
    <FormTextAreaFieldWrapper style={style}>
      <FlexColumnWrapper>
        <label htmlFor={field.name}>{label}</label>
        <textarea id={field.name} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </FormTextAreaFieldWrapper>
  );
};

export default FormTextAreaField;
