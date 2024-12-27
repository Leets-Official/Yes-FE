import { useEffect } from 'react';
import ClipboardJS from 'clipboard';

const CopyLinkButton = () => {
  useEffect(() => {
    const clipboard = new ClipboardJS('[data-clipboard-text]');

    clipboard.on('success', () => {
      console.log('성공');
    });

    clipboard.on('error', () => {
      console.log('실패');
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const inviationId = window.location.pathname.split('/')[2];

  return <button data-clipboard-text={`yourevents.site/${inviationId}`}>링크복사</button>;
};

export default CopyLinkButton;
