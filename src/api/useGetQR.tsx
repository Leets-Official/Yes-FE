import { useEffect, useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

export const useGetQR = (invitationId: string) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { showBoundary } = useErrorBoundary(); // 전역 에러 처리
  const resetUserInfo = useResetRecoilState(UserInfo); // 토큰 만료 시 유저 정보 초기화

  useEffect(() => {
    if (!invitationId) return;

    const fetchData = async () => {
      try {
        const response = await privateAxios(resetUserInfo).get(`/invitation/qr`, {
          params: { invitationId },
        });

        setData(response.data.result.qrUrl);
        setError(null);
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
