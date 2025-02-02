import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

export const useGetInvitation = (id: string) => {
  const [invitation, setInvitation] = useState<Invitation | null>(null);

  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const result = await privateAxios(resetUserInfo).get(`/invitation/${id}`);
        setInvitation(result.data.result);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        } else {
          showBoundary({ name: 'INVITATION_NOT_FOUND' });
        }
      }
    };

    fetchData();
  }, []);

  return { invitation };
};
