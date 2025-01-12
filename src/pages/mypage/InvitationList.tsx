import { useState, useEffect } from 'react';
import InvitationOverview from '../../components/mypage/InvitationOverview';
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';

// 예시 데이터
const data = [
  {
    id: 0,
    img: null,
    title: '연말파티 초대장',
    date: '2024.12.25',
    location: '강남역 어딘가',
    made_date: '2024.12.14',
  },
  {
    id: 1,
    img: null,
    title: '공주 생파 초대',
    date: '2024.12.11',
    location: '강남역 어딘가',
    made_date: '2024.11.01',
  },
  {
    id: 2,
    img: null,
    title: '크리스마스 초대장',
    date: '2024.12.24',
    location: '이태원',
    made_date: '2024.12.14',
  },

  {
    id: 3,
    img: null,
    title: '먹짱모임',
    date: '2025.01.12',
    location: '이태원',
    made_date: '2024.11.10',
  },
];

interface Invitation {
  id: number;
  img: string | null;
  title: string;
  date: string;
  location: string;
  made_date: string;
}

const InvitationList = ({ type }: { type: string }) => {
  const [invitationList, setInvitationList] = useState<Invitation[]>([]);
  const [groupedInvitations, setGroupedInvitations] = useState<Record<string, Invitation[]>>({});

  useEffect(() => {
    if (type === 'received' || type === 'send') {
      // 받은 초대장/보낸 초대장 불러오기
      setInvitationList(data);

      // made_date 별로 그룹화 (data->받아온 데이터로 변경예정)
      const grouped = data.reduce(
        (acc, invitation) => {
          if (!acc[invitation.made_date]) {
            acc[invitation.made_date] = [];
          }
          acc[invitation.made_date].push(invitation);
          return acc;
        },
        {} as Record<string, Invitation[]>,
      );

      setGroupedInvitations(grouped);
    }
  }, [type]);

  return Object.keys(groupedInvitations).map((date, index) => (
    <Container key={index}>
      <Header>
        <div className="made-date">{date}</div>
        <FiChevronRight strokeWidth={2} size={24} />
      </Header>
      {groupedInvitations[date].map((invitation: Invitation) => (
        <InvitationOverview key={invitation.id} invitation={invitation} />
      ))}
    </Container>
  ));
};

export default InvitationList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.313rem;
  gap: 1.375rem;
  margin-bottom: 3.875rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .made-date {
    color: #3e3e3e;
    font-weight: 600;
    font-size: 20px;
  }
`;
