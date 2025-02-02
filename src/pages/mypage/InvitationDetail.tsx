import styled from 'styled-components';
import AttendeeList from '../../components/mypage/AttendeeList';
import ShareList from '../../components/result/ShareList';
import InvitationCard from '../../components/common/InvitationCard';
import { formatDate } from '../../utils/formatDate';
import { useGetAttendees } from '../../api/useGetAttendees';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../../api/useGetInvitation';

const InvitationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { invitation } = useGetInvitation(id || '');
  if (!invitation) return;

  const { attendingGuests, notAttendingGuests } = id
    ? useGetAttendees(id)
    : { attendingGuests: [], notAttendingGuests: [] };

  return (
    <Container>
      {/**플립되는 초대장 */}
      {invitation && (
        <InvitationCard
          title={invitation.title}
          imgURL={invitation.thumbnailUrl}
          date={formatDate(invitation.schedule)}
          location={invitation.location}
          description={invitation.remark}
          backgroundColor="#fff"
          fontColor="black"
        />
      )}
      {/**카카오톡 공유(링크, QR) = isMine인 경우에만...*/}
      <ShareList imgURL={invitation.thumbnailUrl} />
      {/**참석자 명단 */}
      <AttendeeList attendees={attendingGuests} title="참석자 목록" />
      {/**불참석자 명단 */}
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
