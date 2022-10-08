import styled from 'styled-components';
import { useField } from 'formik';

import FlexColumnWrapper from '../common/FlexColumnWrapper';
import FlexRowWrapper from '../common/FlexRowWrapper';

const RoyaltiesFormFieldWrapper = styled.div`
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
    margin-bottom: 20px;

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

  .royalty-pill {
    width: 54px;
    height: 27px;
    background: ${({ theme }) => theme.textColors.tertiary};
    display: grid;
    place-items: center;
    margin-right: 6px;

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.textColors.primary};
    cursor: pointer;
  }

  .error {
    margin-top: 4px;
    color: ${({ theme }) => theme.accentColors.primary};
  }
`;

interface RoyaltiesFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  royaltyAmounts: number[];
}

const RoyaltiesFormField: React.VFC<RoyaltiesFormFieldProps> = ({
  name,
  label,
  placeholder,
  royaltyAmounts = [],
}) => {
  const [field, meta, { setValue }] = useField({ name });

  return (
    <RoyaltiesFormFieldWrapper>
      <FlexColumnWrapper>
        <label htmlFor={field.name}>{label}</label>
        <input
          {...field}
          type="text"
          id={field.name}
          placeholder={placeholder}
          readOnly
          autoComplete="off"
        />
        <FlexRowWrapper>
          {royaltyAmounts.map((royalty, i) => (
            <p
              key={i}
              className="royalty-pill"
              onClick={() => setValue(royalty)}
              style={{
                ...(field.value === royalty && { backgroundColor: '#463245' }),
              }}
            >
              {royalty}%
            </p>
          ))}
        </FlexRowWrapper>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </RoyaltiesFormFieldWrapper>
  );
};

export default RoyaltiesFormField;
