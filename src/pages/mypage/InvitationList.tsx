import { useState, useEffect } from 'react';
import InvitationOverview from '../../components/mypage/InvitationOverview';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';
import theme from '../../style/theme';
import Button from '../../components/common/Button';

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
  const [, setInvitationList] = useState<Invitation[]>([]);
  const [groupedInvitations, setGroupedInvitations] = useState<Record<string, Invitation[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<number | null>(null);

  const handleDeleteInvitation = (id: number) => {
    // 삭제 API
    console.log(id);
    // 모달 닫기
    setIsModalOpen(false);
  };

  const openDeleteModal = (id: number) => {
    setSelectedInvitationId(id); // 삭제할 초대장의 id를 선택
    setIsModalOpen(true); // 모달 열기
  };

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
      {isModalOpen && (
        <Modal width={14.1825} hasCloseButton={false}>
          <div>해당 초대장을 삭제하시나요?</div>
          <Align>
            <ModalButton
              size="small"
              color="#CFCDCD"
              textColor="#fff"
              onClick={() =>
                selectedInvitationId !== null && handleDeleteInvitation(selectedInvitationId)
              }
            >
              삭제
            </ModalButton>
            <ModalButton
              size="small"
              color={theme.color.main}
              textColor="#fff"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              유지
            </ModalButton>
          </Align>
        </Modal>
      )}
      <Header>
        <div className="made-date">{date}</div>
      </Header>
      {groupedInvitations[date].map((invitation: Invitation) => (
        <InvitationOverview
          key={invitation.id}
          invitation={invitation}
          handleDeleteInvitation={openDeleteModal}
          type={type}
        />
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
  align-items: center;

  .made-date {
    margin-right: auto;
    color: #3e3e3e;
    font-weight: 600;
    font-size: 20px;
  }
`;

const Align = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ModalButton = styled(Button)`
  width: 5.5625rem;
  padding: 0.5rem 0;
`;
