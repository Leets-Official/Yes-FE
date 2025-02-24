import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';
import { useState } from 'react';

export const useDeleteInvitation = () => {
  const [loading, setLoading] = useState(false);
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  const deleteInvitation = async (id: string, onSuccess: () => void) => {
    setLoading(true);
    try {
      await privateAxios(resetUserInfo).patch(`/invitation/${id}`);
      onSuccess();
    } catch (error: any) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteInvitation, loading };
};
