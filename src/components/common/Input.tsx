import styled from 'styled-components';

const StyledInput = styled.input<{
  width: string;
  height: string;
}>`
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  width: ${(props) => props.width || '18.125rem'};
  height: ${(props) => props.height || '2.3125rem'};

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Input = ({
  width,
  height,
  value,
  onChange,
}: {
  width: string;
  height: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <StyledInput width={width} height={height} value={value} onChange={onChange} />;
};

export default Input;
