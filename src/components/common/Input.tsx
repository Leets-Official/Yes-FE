import styled from 'styled-components';

const StyledInput = styled.input<{
  width: string;
  height: string;
}>`
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  width: ${(props) => props.width || '18.125rem'};
  height: ${(props) => props.height || '2.3125rem'};
`;

const Input = ({ width, height }: { width: string; height: string }) => {
  return <StyledInput width={width} height={height} />;
};

export default Input;
