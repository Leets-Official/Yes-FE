import { useEffect, useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

export const useGetMyAttendance = (invitationId: string) => {
  const [data, setData] = useState<boolean | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    if (!invitationId) return;

    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const response = await privateAxios(resetUserInfo).get(
          `/invitation/${invitationId}/attendance`,
        );
        setData(response.data.result.attendance);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        } else {
          console.log(error.message);
        }
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [invitationId]);

  return { data };
};

export default useGetMyAttendance;
