import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../atom/UserInfo';
import { privateAxios } from '../utils/customAxios';

export const useGetAttendees = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [attendingGuests, setAttendingGuests] = useState<Guest[]>([]);
  const [notAttendingGuests, setNotAttendingGuests] = useState<Guest[]>([]);

  const { showBoundary } = useErrorBoundary();
  const resetUserInfo = useResetRecoilState(UserInfo);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await privateAxios(resetUserInfo).get(`/invitation/${id}/guests`);
        const attending = result.data.result.attending || [];
        const notAttending = result.data.result.notAttending || [];

        setAttendingGuests(attending);
        setNotAttendingGuests(notAttending);
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

  return { attendingGuests, notAttendingGuests, loading };
};
