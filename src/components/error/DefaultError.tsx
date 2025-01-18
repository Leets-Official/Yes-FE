import styled from 'styled-components';
import Button from '../common/Button';
import NotFoundImg from '../../assets/NotFoundImg.svg';

interface ErrorProps {
  message: string;
  btnText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultError = ({ message, btnText, onClick }: ErrorProps) => {
  return (
    <Container>
      <img src={NotFoundImg} />
      <Phrase>{message}</Phrase>
      <BackButton onClick={onClick}>{btnText}</BackButton>
    </Container>
  );
};

export default DefaultError;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 480px;
  height: 100vh;
`;

const Phrase = styled.div`
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3e3e3e;
`;

const BackButton = styled(Button)`
  padding: 0.75rem 1.375rem;
  background-color: white;
  color: #3e3e3e;
  border: 1px solid #787878;
`;
