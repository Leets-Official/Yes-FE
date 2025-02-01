import { useEffect, useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

type InvitationType = {
  ownerNickname: string;
  thumbnailUrl: string;
  title: string;
  schedule: string;
  location: string;
  remark: string;
};

export const usePostInvitation = (invitationData: InvitationType) => {
  const [invitationId, setInvitationId] = useState<string | null>(null);

  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    if (!invitationData) return;

    const fetchData = async () => {
      try {
        const response = await privateAxios(resetUserInfo).post(`/invitation`, {
          invitationData,
        });

        setInvitationId(response.data.result.invitation.invitationId);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        } else {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [invitationData]);

  return { invitationId };
};

export default usePostInvitation;
