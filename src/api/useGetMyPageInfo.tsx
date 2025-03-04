import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

interface UserData {
  nickname: string;
  receivedInvitationCount: number;
  sentInvitationCount: number;
}

export const useGetMyPageInfo = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData>({
    nickname: '',
    receivedInvitationCount: 0,
    sentInvitationCount: 0,
  });

  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await privateAxios(resetUserInfo).get('/mypage');
        setUser(result.data.result);
      } catch (error: any) {
        if (error.name !== 'GENERAL') {
          showBoundary(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, loading };
};
