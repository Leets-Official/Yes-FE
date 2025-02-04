import styled from 'styled-components';
import { useGetAttendees } from '../../api/useGetAttendees';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../../api/useGetInvitation';
import { useEffect, useState } from 'react';
import AttendeeItem from './AttendeeItem';

const AttendeeList = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');

  // 상태 관리
  const [attendingGuests, setAttendingGuests] = useState<Guest[]>([]);
  const [notAttendingGuests, setNotAttendingGuests] = useState<Guest[]>([]);

  // id가 존재할 때만 useGetAttendees 호출
  const { attendingGuests: fetchedAttending, notAttendingGuests: fetchedNotAttending } =
    useGetAttendees(invitationId || '');

  useEffect(() => {
    if (fetchedAttending && fetchedNotAttending) {
      setAttendingGuests(fetchedAttending);
      setNotAttendingGuests(fetchedNotAttending);
    }
  }, [fetchedAttending, fetchedNotAttending]);

  if (!invitation) return null;

  return (
    <Container>
      {/* 참석자 명단 */}
      <AttendeeItem attendees={attendingGuests} title="참석자 목록" />
      {/* 불참석자 명단 */}
      <AttendeeItem attendees={notAttendingGuests} title="불참석자 목록" />
    </Container>
  );
};

export default AttendeeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.313rem;
  margin-bottom: 2.75rem;
`;
