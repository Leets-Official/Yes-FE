import styled from 'styled-components';
import AttendeeList from '../../components/common/AttendeeList';
import ShareList from '../../components/result/ShareList';
import InvitationCard from '../../components/common/InvitationCard';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../../api/useGetInvitation';
import { template } from './../../data/Template';
import useGetIsMine from '../../api/useGetIsMine';
import NotMine from '../../components/reciveInvitation/NotMine';
import Loading from '../Loading';

const InvitationDetail = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');
  const { data: isMine, loading } = useGetIsMine(invitationId || '');

  if (!invitation) return null;
  return (
    <Container>
      {!loading ? (
        isMine ? (
          <>
            {/* 플립되는 초대장 */}
            <InvitationCard
              title={invitation.title}
              imgURL={invitation.thumbnailUrl}
              date={invitation.schedule}
              location={invitation.location}
              description={invitation.remark}
              backgroundColor={template[invitation.templateKey]?.bg_color || 'white'}
              fontColor={template[invitation.templateKey]?.bg_text_color || 'black'}
            />
            {/* 카카오톡 공유(링크, QR) */}
            <ShareList
              ownerNickname={invitation.ownerNickname}
              thumbnailUrl={invitation.thumbnailUrl}
              size="small"
            />
            <AttendeeList />
          </>
        ) : (
          <NotMine />
        )
      ) : (
        <Loading />
      )}
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
