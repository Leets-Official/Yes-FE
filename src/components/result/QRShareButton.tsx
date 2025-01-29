import styled from 'styled-components';
import QRshare from '../../assets/QRsahre.svg';
import Modal from '../common/Modal';
import Button from '../common/Button';
import theme from '../../style/theme';
import { useCallback, useState } from 'react';
import useGetQR from '../../api/useGetQR';

const QRShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const invitationId = window.location.pathname.split('/')[2];

  const { data: QRUrl } = useGetQR(invitationId);

  const onClickDownload = useCallback((srcUrl: string | null, name: string) => {
    if (!srcUrl) return;
    fetch(srcUrl, { method: 'GET' })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        a.remove();
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, []);

  console.log(QRUrl);

  return (
    <Container>
      {isModalOpen && (
        <Modal width={10.37} hasCloseButton onClose={() => setIsModalOpen(false)}>
          <QR src={QRUrl ?? ''} alt="QR" />
          <DownloadButton
            size="small"
            color={theme.color.main}
            textColor="#fff"
            onClick={() => onClickDownload(QRUrl, `${invitationId}_QR.png`)}
          >
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

const QR = styled.img`
  width: 8rem;
  height: 8rem;
  background-color: #ddd;
`;
