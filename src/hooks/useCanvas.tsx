import { useEffect, useRef } from 'react';
import { template } from '../data/Template';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

const useCanvas = (templateKey: string | null, textValues: string[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

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
          const [, , , , fontSize, fontColor, x, y] = textAttr;

          ctx.font = `${fontSize * 10}px ${template[templateKey].font}`;
          ctx.textAlign = 'center';
          ctx.fillStyle = fontColor;

          ctx.fillText(textValues[index] || '', x, y);
        });
      };
    };

    drawCanvas();
  }, [templateKey, textValues]);

  const uploadCanvasImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        const thisTime = new Date().getTime().toString();
        if (!blob) return reject('Blob 생성 실패');

        try {
          // Presigned URL 요청
          const response = await privateAxios(resetUserInfo).post(`/presignedurl`, {
            imageName: `${thisTime}.png`,
          });

          const presignedUrl = response.data.result.preSignedUrl;

          // Presigned URL로 파일 업로드
          const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            body: blob,
            headers: {
              'Content-Type': 'image/png',
            },
          });

          if (uploadResponse.ok) {
            console.log('파일 업로드 성공!');
            resolve(presignedUrl); // 성공적으로 업로드 후 URL 반환
          } else {
            console.error('파일 업로드 실패:', uploadResponse.statusText);
            reject('파일 업로드 실패');
          }
        } catch (error: any) {
          console.error(error);
          reject(error.message); // 에러 발생 시 reject
        }
      }, 'image/png'); // Blob 타입을 'image/png'로 지정
    });
  };

  const uploadImage = async (imageFile: File) => {
    let presignedUrl = '';
    try {
      const thisTime = new Date().getTime().toString();
      // Presigned URL 요청
      const response = await privateAxios(resetUserInfo).post(`/presignedurl`, {
        imageName: `${thisTime}.${imageFile.name.split('.').pop()}`,
      });

      presignedUrl = response.data.result.preSignedUrl;

      // Presigned URL로 파일 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: imageFile,
        headers: {
          'Content-Type': imageFile.type,
        },
      });

      if (uploadResponse.ok) {
        console.log('파일 업로드 성공!');
      } else {
        console.error('파일 업로드 실패:', uploadResponse.statusText);
      }
    } catch (error: any) {
      if (error.name !== 'GENERAL') {
        showBoundary(error);
      } else {
        console.log(error.message);
      }
    }

    return presignedUrl;
  };
  return { canvasRef, uploadCanvasImage, uploadImage };
};

export default useCanvas;
