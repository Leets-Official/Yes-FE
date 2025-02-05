import { useState } from 'react';
import { privateAxios } from '../utils/customAxios';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';

type InvitationType = {
  ownerNickname: string;
  templateKey: string | null;
  thumbnailUrl: string;
  title: string;
  schedule: string;
  location: string;
  remark: string;
};

export const usePostInvitation = () => {
  const [loading, setLoading] = useState(false);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  const postInvitation = async (invitationData: InvitationType) => {
    setLoading(true);

    console.log('invitationData', invitationData);
    try {
      const response = await privateAxios(resetUserInfo).post(`/invitation`, invitationData);

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

  return { postInvitation, loading };
};
