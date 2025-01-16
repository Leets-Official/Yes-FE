import styled from 'styled-components';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14.1825rem;

  background-color: #fff;
  border-radius: 1rem;
  font-size: 0.8125rem;

  gap: 1.06rem;
  padding: 1.19rem 2.69rem;
`;
