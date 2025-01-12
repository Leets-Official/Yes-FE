import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

  return (
    <Contents onClick={() => handleInvitationClick(invitation.id)}>
      <Content className="img-bg">{invitation.img && <img src={invitation.img} />}</Content>
      <Content>
        <MainText>{invitation.title}</MainText>
        <SubText>{invitation.date}</SubText>
        <SubText>{invitation.location}</SubText>
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

const MainText = styled.div`
  font-weight: 500;
  margin-bottom: 0.688rem;
`;

const SubText = styled.div`
  color: #787878;
  font-weight: 400;
  margin-bottom: 0.25rem;
`;
