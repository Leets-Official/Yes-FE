import { useEffect, useRef } from 'react';
import { template } from '../data/Template';

const useCanvas = (templateKey: string, textValues: string[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

        // 텍스트 그리기
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

  // 캔버스 이미지 저장 함수
  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스를 PNG 이미지로 변환
    const imageUrl = canvas.toDataURL('image/png');

    // 다운로드 링크 생성
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'invitation_image.png'; // 다운로드할 파일 이름
    link.click(); // 링크 클릭으로 다운로드 실행
  };

  return { canvasRef, saveCanvasImage };
};

export default useCanvas;
