import styled from 'styled-components';
import small_yes from '/image/small_yes.svg';
import { IoIosClose } from 'react-icons/io';

const Modal = ({
  children,
  width,
  hasCloseButton,
  onClose,
}: {
  children: React.ReactNode;
  width: number;
  hasCloseButton: boolean;
  onClose?: () => void;
}) => {
  return (
    <Container>
      <Content $width={width}>
        <Header $width={width}>
          <Space />
          <img src={small_yes} alt="logo" />
          {hasCloseButton ? (
            <IoIosClose strokeWidth={1} size={28} onClick={onClose} style={{ cursor: 'pointer' }} />
          ) : (
            <Space />
          )}
        </Header>
        {children}
      </Content>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div<{ $width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.$width + 'rem'};

  background-color: #fff;
  border-radius: 1rem;
  font-size: 0.8125rem;

  gap: 1.06rem;
  padding: 1.19rem 2.69rem;
`;

const Header = styled.div<{ $width: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.$width + 2.69 + 'rem'};
`;

const Space = styled.div`
  width: 1rem;
  height: 1rem;
`;
