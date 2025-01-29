import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';

interface Invitation {
  invitationId: string;
  thumbnailUrl: string | null;
  title: string;
  schedule: string;
  location: string;
  createDate: string;
  remark: string;
}

interface InvitationOverviewProps {
  invitation: Invitation;
  handleDeleteInvitation: (id: string) => void;
  type: string;
  formatDate: (dateString: string) => string;
}

const InvitationOverview = ({
  invitation,
  handleDeleteInvitation,
  type,
  formatDate,
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
          <SubText>{formatDate(invitation.schedule)}</SubText>
          <SubText>{invitation.location}</SubText>
        </Texts>
        {type === 'send' && (
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
    background-color: #d9d9d9;
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
