import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { publicAxios } from '../utils/customAxios';

export const useGetInvitation = (id: string) => {
  const [invitation, setInvitation] = useState<Invitation | null>(null);

  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const result = await publicAxios.get(`/invitation/${id}`);
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
