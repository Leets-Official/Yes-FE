import styled from 'styled-components';

const StyledTextArea = styled.textarea<{
  width: string;
  height: string;
}>`
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  resize: none;
  width: ${(props) => props.width || '18.125rem'};
  height: ${(props) => props.height || '7rem'};
`;

const TextArea = ({ width, height }: { width: string; height: string }) => {
  return <StyledTextArea width={width} height={height} />;
};

export default TextArea;
