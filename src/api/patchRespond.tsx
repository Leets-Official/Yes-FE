import { useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

export const usePatchRespond = () => {
  const [loading, setLoading] = useState(false);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  const patchRespond = async (attendanceStatus: {
    nickname: string;
    invitationId: string;
    attendance: boolean;
  }) => {
    setLoading(true);

    try {
      const response = await privateAxios(resetUserInfo).patch(`/guest/respond`, attendanceStatus);

      return response.data.result;
    } catch (error: any) {
      if (error.name !== 'GENERAL') {
        showBoundary(error);
      } else {
        console.error(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { patchRespond, loading };
};
