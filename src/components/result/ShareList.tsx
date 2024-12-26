import { useEffect } from 'react';
import ClipboardJS from 'clipboard';

const ShareList = () => {
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

  return (
    <div>
      <button data-clipboard-text="복사 테스트">링크복사</button>
      <button>카톡</button>
      <button>QR</button>
    </div>
  );
};

export default ShareList;
