import { useEffect, useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

export const useGetIsMine = (invitationId: string) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    if (!invitationId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await privateAxios(resetUserInfo).get(
          `/invitation/${invitationId}/verify-sender`,
        );

        setData(response.data.result);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        } else {
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [invitationId]);

  return { data, loading };
};

export default useGetIsMine;
