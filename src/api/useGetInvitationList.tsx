import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

export const useGetInvitationList = (type: string) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const result = await privateAxios(resetUserInfo).get(`/mypage/invitation/${type}`);
        setInvitations(result.data.result);
      } catch (error: any) {
        showBoundary(error);
      }
    };

    fetchInvitations();
  }, []);

  return { invitations };
};
