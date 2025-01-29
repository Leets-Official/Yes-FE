/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface DateInputProps {
  value?: string | number;
  onChange: (value: string | number) => void;
  year?: number;
  month?: number;
  inputType: 'year' | 'month' | 'day' | 'hour' | 'minute';
}

const getMaxDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const DateInput: React.FC<DateInputProps> = ({ value = '', onChange, year, month, inputType }) => {
  const [date, setDate] = useState<string | number>(value);

  const checkValidDate = (val: number): boolean => {
    if (isNaN(val)) return false;

    switch (inputType) {
      case 'year':
        return val >= 2020 && val <= 2040;
      case 'month':
        return val >= 1 && val <= 12;
      case 'day':
        if (year && month) {
          const maxDays = getMaxDaysInMonth(year, month);
          return val >= 1 && val <= maxDays;
        }
        return val >= 1 && val <= 31;
      case 'hour':
        return val >= 0 && val <= 23;
      case 'minute':
        return val >= 0 && val <= 59;
      default:
        return true;
    }
  };

  useEffect(() => {
    // value가 변경될 때 date 상태 업데이트
    if (checkValidDate(Number(value))) {
      setDate(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numericVal = Number(val);
    setDate(val); // 로컬 상태 업데이트
    if (checkValidDate(numericVal)) {
      onChange(numericVal); // 유효한 값만 부모 컴포넌트로 전달
    }
  };

  const handleBlur = () => {
    const numericDate = Number(date);
    if (!checkValidDate(numericDate)) {
      let correctedValue: number | string = '';
      switch (inputType) {
        case 'year':
          correctedValue = Math.max(2020, Math.min(2040, numericDate));
          break;
        case 'month':
          correctedValue = Math.max(1, Math.min(12, numericDate));
          break;
        case 'day':
          if (year && month) {
            const maxDays = getMaxDaysInMonth(year, month);
            correctedValue = Math.max(1, Math.min(maxDays, numericDate));
          } else {
            correctedValue = Math.max(1, Math.min(31, numericDate));
          }
          break;
        case 'hour':
          correctedValue = Math.max(0, Math.min(23, numericDate));
          break;
        case 'minute':
          correctedValue = Math.max(0, Math.min(59, numericDate));
          break;
        default:
          break;
      }
      setDate(correctedValue);
      onChange(correctedValue); // 수정된 값 부모 컴포넌트로 전달
    }
  };

  return (
    <div>
      <Input
        type="number"
        value={date}
        onChange={handleChange}
        onBlur={handleBlur}
        min={inputType === 'year' ? 2020 : undefined}
        max={inputType === 'year' ? 2040 : undefined}
      />
    </div>
  );
};

export default DateInput;

const Input = styled.input.attrs({ type: 'number' })`
  width: 2rem;
  border: none;
  text-align: right;
  margin-top: 0.03rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
