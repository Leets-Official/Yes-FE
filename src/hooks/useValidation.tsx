import { useState } from 'react';

const useValidation = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(-1); // -1: 초기 상태, 0: 실패, 1: 성공

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const inputValue = e.target.value.trim(); // 입력값의 공백 제거
    setValue(inputValue);

    if (inputValue !== '') setIsValid(1);
    else setIsValid(0);
  };

  const validate = () => {
    if (value === '') {
      setIsValid(0);
      return false;
    }
    setIsValid(1);
    return true;
  };

  return { value, isValid, handleInputChange, validate };
};

export default useValidation;
