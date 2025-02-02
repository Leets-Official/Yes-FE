import styled from 'styled-components';
import QRshare from '../../assets/QRsahre.svg';
import Modal from '../common/Modal';
import theme from '../../style/theme';
import { useCallback, useState } from 'react';
import useGetQR from '../../api/useGetQR';
import { ButtonImg, Container } from './ShareButtonStyle';
import Button from '../common/Button';

const QRShareButton = ({ size }: { size: 'small' | 'big' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const invitationId = window.location.pathname.split('/')[2];

  const { data: QRUrl } = useGetQR(invitationId);

  const onClickDownload = useCallback((srcUrl: string | null, name: string) => {
    if (!srcUrl) return;
    const a = document.createElement('a');
    a.href = srcUrl;
    a.download = name;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  return (
    <Container size={size}>
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
      <ButtonImg
        size={size}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <img src={QRshare} alt="QR" />
      </ButtonImg>
      <div>QR 코드</div>
    </Container>
  );
};
export default QRShareButton;

const DownloadButton = styled(Button)`
  width: 5.5625rem;
  height: 2rem;
`;

const QR = styled.img`
  width: 8rem;
  height: 8rem;
  background-color: #ddd;
`;
