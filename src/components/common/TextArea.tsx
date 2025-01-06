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

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const TextArea = ({
  width,
  height,
  value,
  onChange,
}: {
  width: string;
  height: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return <StyledTextArea width={width} height={height} value={value} onChange={onChange} />;
};

export default TextArea;
