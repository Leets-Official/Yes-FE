import { useEffect, useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const useGetQR = (invitationId: string) => {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { showBoundary } = useErrorBoundary(); // 전역 에러 처리
  const resetUserInfo = useResetRecoilState(UserInfo); // 토큰 만료 시 유저 정보 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await privateAxios(resetUserInfo).get(`${BASE_URL}/invitation/qr`, {
          params: { invitationId },
        });

        if (response.status === 200) {
          setData(response.data.result.qrUrl);
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error); // 500 에러 → 전역 에러 핸들링
        } else {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [invitationId]);

  return { data, error };
};

export default useGetQR;
