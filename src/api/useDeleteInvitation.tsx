import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

export const useDeleteInvitation = () => {
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  const deleteInvitation = async (id: string, onSuccess: () => void) => {
    try {
      await privateAxios(resetUserInfo).patch(`/invitation/${id}`);
      onSuccess();
    } catch (error: any) {
      showBoundary(error);
    }
  };

  return { deleteInvitation };
};
