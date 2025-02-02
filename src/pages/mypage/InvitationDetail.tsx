import styled from 'styled-components';
import AttendeeList from '../../components/mypage/AttendeeList';
import ShareList from '../../components/result/ShareList';
import InvitationCard from '../../components/common/InvitationCard';
import { formatDate } from '../../utils/formatDate';
import { useGetAttendees } from '../../api/useGetAttendees';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../../api/useGetInvitation';
import { useEffect, useState } from 'react';

const InvitationDetail = () => {
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
      {/* 플립되는 초대장 */}
      <InvitationCard
        title={invitation.title}
        imgURL={invitation.thumbnailUrl}
        date={formatDate(invitation.schedule)}
        location={invitation.location}
        description={invitation.remark}
        backgroundColor="#fff"
        fontColor="black"
      />
      {/* 카카오톡 공유(링크, QR) */}
      {/* TODO: ownerNickname 값 수정 필요 */}
      <ShareList ownerNickname="닉네임" thumbnailUrl={invitation.thumbnailUrl} size="small" />
      {/* 참석자 명단 */}
      <AttendeeList attendees={attendingGuests} title="참석자 목록" />
      {/* 불참석자 명단 */}
      <AttendeeList attendees={notAttendingGuests} title="불참석자 목록" />
    </Container>
  );
};

export default InvitationDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.313rem;
`;
