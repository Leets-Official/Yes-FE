import { useEffect } from 'react';
import ClipboardJS from 'clipboard';
import styled from 'styled-components';
import copylink from '../../assets/copylink.svg';

const CopyLinkButton = () => {
  useEffect(() => {
    const clipboard = new ClipboardJS('[data-clipboard-text]');

    clipboard.on('success', () => {
      console.log('복사 성공');
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
    <Container>
      <Button data-clipboard-text={`yourevents.site/${invitationId}`} aria-label="링크 복사">
        <img src={copylink} alt="링크 복사" />
      </Button>
      <div>URL 복사</div>
    </Container>
  );
};

export default CopyLinkButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.31rem;

  div {
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 2.75rem;
    height: 2.75rem;
  }
`;
