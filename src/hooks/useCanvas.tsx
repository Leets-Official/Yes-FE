import { useEffect, useRef, useState } from 'react';
import { template } from '../data/Template';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

const useCanvas = (templateKey: string | undefined, textValues: string[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();
  const [presignedUrl, setPresignedUrl] = useState<string>('');

  useEffect(() => {
    if (!templateKey) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCanvas = () => {
      canvas.width = 3277;
      canvas.height = 4096;

      const img = new Image();
      img.src = template[templateKey].template_src;

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        template[templateKey].text_attr.forEach((textAttr, index) => {
          const [left, top, width, height, fontSize, fontColor, x, y] = textAttr;

          ctx.font = `${fontSize * 10}px ${template[templateKey].font}`;
          ctx.textAlign = 'center';
          ctx.fillStyle = fontColor;

          ctx.fillText(textValues[index] || '', x, y);
        });
      };
    };

    drawCanvas();
  }, [templateKey, textValues]);

  const saveCanvasImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      const thisTime = new Date().getTime().toString();
      if (!blob) return;

      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${thisTime}.png`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // URL.revokeObjectURL(url);

      try {
        const response = await privateAxios(resetUserInfo).post(`/presignedurl`, {
          imageName: `${thisTime}.png`,
        });
        console.log('success');
        setPresignedUrl(response.data.result.preSignedUrl);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        } else {
          console.log(error.message);
        }
      }
    });
  };

  return { canvasRef, saveCanvasImage, presignedUrl };
};

export default useCanvas;
