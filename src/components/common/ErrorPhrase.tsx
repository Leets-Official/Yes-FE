import { IoAlertCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';

const ErrorPhrase = ({ message, ...props }: { message: string }) => {
  return (
    <Container {...props}>
      <IoAlertCircleOutline size={13} />
      <div>{message}</div>
    </Container>
  );
};

export default ErrorPhrase;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.313rem;
  font-size: 0.875rem;
  font-weight: 500;
  > * {
    color: #ff8b8b;
  }
`;
