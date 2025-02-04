import styled from 'styled-components';
import AttendeeList from '../../components/common/AttendeeList';
import ShareList from '../../components/result/ShareList';
import InvitationCard from '../../components/common/InvitationCard';
import { formatDate } from '../../utils/formatDate';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../../api/useGetInvitation';

const InvitationDetail = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');

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
      <AttendeeList />
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
