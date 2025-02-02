import { useEffect } from 'react';
import ClipboardJS from 'clipboard';
import copylink from '../../assets/copylink.svg';
import { toast } from 'react-toastify';
import { ButtonImg, Container } from './ShareButtonStyle';

const CopyLinkButton = ({ size }: { size: 'small' | 'big' }) => {
  useEffect(() => {
    const clipboard = new ClipboardJS('[data-clipboard-text]');

    clipboard.on('success', () => {
      toast('복사 완료! 친구에게 슝✨');
    });

    clipboard.on('error', () => {
      console.log('복사 실패');
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const invitationId = window.location.pathname.split('/')[2];

  return (
    <Container size={size}>
      <ButtonImg
        size={size}
        data-clipboard-text={`yourevents.site/${invitationId}`}
        aria-label="링크 복사"
      >
        <img src={copylink} alt="링크 복사" />
      </ButtonImg>
      <div>URL 복사</div>
    </Container>
  );
};

export default CopyLinkButton;
