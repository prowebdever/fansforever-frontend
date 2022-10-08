import styled from 'styled-components';
import { useField } from 'formik';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

import FlexColumnWrapper from '../common/FlexColumnWrapper';

const DateTimeFormFieldWrapper = styled.div`
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
    width: 100%;
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

interface DateTimeFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  initialValue: number;
  validate: () => void;
}

const DateTimeFormField: React.VFC<DateTimeFormFieldProps> = ({
  label,
  validate = null,
  initialValue,
  ...props
}) => {
  const [field, meta, { setValue }] = useField({
    ...props,
    ...(validate && { validate }),
  });

  return (
    <DateTimeFormFieldWrapper>
      <FlexColumnWrapper>
        <label htmlFor={field.name}>{label}</label>
        <Datetime
          {...field}
          {...props}
          inputProps={{ readOnly: true, placeholder: props.placeholder }}
          renderInput={undefined}
          value={field.value}
          dateFormat="DD-MMMM-YYYY"
          onChange={(event) => {
            if (event) {
              const msTime = event.valueOf();
              if (msTime > initialValue) {
                setValue(event.valueOf());
              }
            }
          }}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </DateTimeFormFieldWrapper>
  );
};

export default DateTimeFormField;
