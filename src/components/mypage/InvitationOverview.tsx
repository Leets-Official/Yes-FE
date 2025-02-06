import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import dayjs from 'dayjs';

interface InvitationOverviewProps {
  invitation: Invitation;
  handleDeleteInvitation: (id: string) => void;
  type: string;
}

const InvitationOverview = ({
  invitation,
  handleDeleteInvitation,
  type,
}: InvitationOverviewProps) => {
  const navigate = useNavigate();
  const handleInvitationClick = (id: string) => {
    /**초대장 상세보기 이동 */
    navigate(`/mypage/detail/${id}`);
  };

  return (
    <Contents>
      <Content className="img-bg" onClick={() => handleInvitationClick(invitation.invitationId)}>
        {invitation.thumbnailUrl && <img src={invitation.thumbnailUrl} />}
      </Content>
      <Content>
        <Texts onClick={() => handleInvitationClick(invitation.invitationId)}>
          <MainText>{invitation.title}</MainText>
          <SubText>{dayjs(invitation.schedule).format('YYYY년 M월 D일')}</SubText>
          <SubText>{invitation.location}</SubText>
        </Texts>
        {type === 'sent' && (
          <DeleteButton
            color="white"
            textColor="#CFCDCD"
            border="1px solid #CFCDCD"
            onClick={() => handleDeleteInvitation(invitation.invitationId)}
          >
            초대장 삭제
          </DeleteButton>
        )}
      </Content>
    </Contents>
  );
};

export default InvitationOverview;

const Contents = styled.div`
  display: flex;
  margin-right: auto;
  gap: 1.813rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;

  &.img-bg {
    width: 5.688rem;
    height: 7.063rem;
    border-radius: 8px;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainText = styled.div`
  font-weight: 500;
  margin-bottom: 0.688rem;
`;

const SubText = styled.div`
  color: #787878;
  font-weight: 400;
  margin-bottom: 0.25rem;
`;

const DeleteButton = styled(Button)`
  padding: 5px 8px;
  font-size: 11px;
  font-weight: 500;
  margin-top: auto;
`;
