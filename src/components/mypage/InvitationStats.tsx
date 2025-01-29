import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const InvitationStats = ({
  receivedInvitationCount,
  sentInvitationCount,
}: {
  receivedInvitationCount: number;
  sentInvitationCount: number;
}) => {
  const navigate = useNavigate();

  const handleStatClick = (type: string) => {
    if (type === 'received') {
      // 받은 초대장 목록 이동
      navigate('/mypage/received');
    } else if (type === 'sent') {
      // 보낸 초대장 목록 이동
      navigate('/mypage/sent');
    }
  };

  return (
    <StatsContainer>
      <Stat onClick={() => handleStatClick('received')}>
        <StatTitle>받은 초대장</StatTitle>
        <StatCount>{receivedInvitationCount}</StatCount>
      </Stat>
      <SplitStat />
      <Stat onClick={() => handleStatClick('sent')}>
        <StatTitle>보낸 초대장</StatTitle>
        <StatCount>{sentInvitationCount}</StatCount>
      </Stat>
    </StatsContainer>
  );
};

export default InvitationStats;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.719rem;
  margin: 2.063rem 0.313rem 3.25rem 0.313rem;
  width: 100%;
  padding: 1.063rem 0 0.75rem 0;
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.438rem;
  cursor: pointer;
`;

const StatTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const StatCount = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SplitStat = styled.div`
  width: 1px;
  height: 30px;
  background-color: #cfcdcd;
`;
