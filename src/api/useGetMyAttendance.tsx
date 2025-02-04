import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { useEffect, useState } from 'react';

export const fetchMyAttendance = async (invitationId: string) => {
  if (!invitationId) return null;

  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  try {
    const response = await privateAxios(resetUserInfo).get(
      `/invitation/${invitationId}/attendance`,
    );
    return response.data.result;
  } catch (error: any) {
    if (error.name !== 'GENERAL') {
      showBoundary(error);
    } else {
      console.log(error.message);
    }
    return null;
  }
};

export const useGetMyAttendance = (invitationId: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadAttendance = async () => {
      const result = await fetchMyAttendance(invitationId);
      setData(result);
    };

    if (invitationId) {
      loadAttendance();
    }
  }, [invitationId]);

  return { data, refetch: () => fetchMyAttendance(invitationId) };
};

export default useGetMyAttendance;
