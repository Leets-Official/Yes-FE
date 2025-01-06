import styled from 'styled-components';

const StyledInput = styled.input<{
  width: string;
  height: string;
}>`
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  width: ${(props) => props.width || '18.125rem'};
  height: ${(props) => props.height || '2.3125rem'};

  // input 요소 내부 여백
  padding: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// Input 입력 값
interface InputProps {
  width: string;
  height: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  width,
  height,
  value,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <StyledInput
      width={width}
      height={height}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default Input;
