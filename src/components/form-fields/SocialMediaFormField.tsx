import * as React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { IconType } from 'react-icons';

import FlexColumnWrapper from '../common/FlexColumnWrapper';
import FlexRowWrapper from '../common/FlexRowWrapper';

const SocialMediaFormFieldWrapper = styled.div`
  width: 100%;
  padding-top: 8px;
  margin-bottom: 18px;

  ${FlexRowWrapper} {
    width: 100%;
    position: relative;
  }

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    color: ${({ theme }) => theme.accentColors.primary};
  }

  input {
    width: 100%;
    padding-left: 36px;
    padding-bottom: 18px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
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

interface SocialMediaFormFieldProps {
  icon: IconType;
  name: string;
}

const SocialMediaFormField: React.VFC<
  SocialMediaFormFieldProps & React.HTMLAttributes<HTMLInputElement>
> = ({ icon, name, placeholder }) => {
  const [field, meta] = useField(name);

  const Icon = icon;

  return (
    <SocialMediaFormFieldWrapper>
      <FlexColumnWrapper>
        <FlexRowWrapper>
          <Icon />
          <input {...field} placeholder={placeholder} autoComplete="off" />
        </FlexRowWrapper>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </SocialMediaFormFieldWrapper>
  );
};

export default SocialMediaFormField;
