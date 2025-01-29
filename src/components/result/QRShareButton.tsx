import styled from 'styled-components';
import QRshare from '../../assets/QRsahre.svg';
import Modal from '../common/Modal';
import Button from '../common/Button';
import theme from '../../style/theme';
import { useState } from 'react';

const QRShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      {isModalOpen && (
        <Modal width={10.37} hasCloseButton onClose={() => setIsModalOpen(false)}>
          <QR>QR</QR>
          <div>QR 이미지를 저장해 공유해보세요!</div>
          <DownloadButton size="small" color={theme.color.main} textColor="#fff" onClick={() => {}}>
            저장하기
          </DownloadButton>
        </Modal>
      )}
      <QRButton
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <img src={QRshare} alt="QR" />
      </QRButton>
      <div>QR 코드</div>
    </Container>
  );
};
export default QRShareButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.31rem;

  div {
    font-size: 0.75rem;
  }
`;

const QRButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 2.75rem;
    height: 2.75rem;
  }
`;

const DownloadButton = styled(Button)`
  width: 5.5625rem;
  height: 2rem;
`;

const QR = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #ddd;
`;
