import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';

interface Invitation {
  id: number;
  img: string | null;
  title: string;
  date: string;
  location: string;
  made_date: string;
}

const InvitationOverview = ({ invitation }: { invitation: Invitation }) => {
  const navigate = useNavigate();
  const handleInvitationClick = (id: number) => {
    /**초대장 상세보기 이동 */
    navigate(`/mypage/detail/${id}`);
  };

  const handleDeleteInvitation = (id: number) => {
    // 삭제 API 연결
  };

  return (
    <Contents>
      <Content className="img-bg" onClick={() => handleInvitationClick(invitation.id)}>
        {invitation.img && <img src={invitation.img} />}
      </Content>
      <Content>
        <Texts onClick={() => handleInvitationClick(invitation.id)}>
          <MainText>{invitation.title}</MainText>
          <SubText>{invitation.date}</SubText>
          <SubText>{invitation.location}</SubText>
        </Texts>
        {/**invitation.isMine(boolean) 값을 통해 보여줌 */}
        <DeleteButton
          color="white"
          textColor="#CFCDCD"
          border="1px solid #CFCDCD"
          onClick={() => handleDeleteInvitation(invitation.id)}
        >
          초대장 삭제
        </DeleteButton>
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
