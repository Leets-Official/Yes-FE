import { useState, useEffect } from 'react';
import InvitationOverview from '../../components/mypage/InvitationOverview';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';
import theme from '../../style/theme';
import Button from '../../components/common/Button';
import { useGetInvitationList } from '../../api/useGetInvitationList';
import { useDeleteInvitation } from '../../api/useDeleteInvitation';
import dayjs from 'dayjs';

const InvitationList = ({ type }: { type: string }) => {
  const { invitations, isLoading } = useGetInvitationList(type);
  const { deleteInvitation } = useDeleteInvitation();

  const [invitationList, setInvitationList] = useState<Invitation[]>([]); // 초대장 리스트
  const [groupedInvitations, setGroupedInvitations] = useState<Record<string, Invitation[]>>({}); // 날짜별 그룹 초대장 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); // 초대장 삭제 모달 오픈 여부
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null); // 삭제선택된 초대장 ID
  const [isEmpty, setIsEmpty] = useState(true); // 초대장이 존재하는지 여부 체크

  useEffect(() => {
    setInvitationList(invitations);
  }, [invitations]);

  useEffect(() => {
    if (invitationList.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      const sortedInvitationList = [...invitationList].sort((a, b) => {
        return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
      });

      // 만들어진 날짜별로 초대장 그룹화.
      const grouped = sortedInvitationList.reduce(
        (acc, invitation) => {
          const formattedDate = dayjs(invitation.createDate).format('YYYY년 M월 D일');
          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }
          acc[formattedDate].push(invitation);
          return acc;
        },
        {} as Record<string, Invitation[]>,
      );

      setGroupedInvitations(grouped);
    }
  }, [invitationList]);

  const handleDeleteInvitation = (id: string) => {
    deleteInvitation(id, () => {
      setInvitationList((prevList) => prevList.filter((inv) => inv.invitationId !== id));
    });
    setIsModalOpen(false);
  };

  const openDeleteModal = (id: string) => {
    setSelectedInvitationId(id); // 삭제할 초대장의 id를 선택
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <>
      {isLoading ? (
        <Phrase>초대장 불러오는 중...</Phrase>
      ) : isEmpty ? (
        <Phrase>초대장이 존재하지 않습니다.</Phrase>
      ) : (
        Object.keys(groupedInvitations).map((date, index) => (
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
                key={invitation.invitationId}
                invitation={invitation}
                handleDeleteInvitation={openDeleteModal}
                type={type}
              />
            ))}
          </Container>
        ))
      )}
    </>
  );
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

const Phrase = styled.div`
  font-size: 20px;
  color: #3e3e3e;
`;

const Align = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ModalButton = styled(Button)`
  width: 5.5625rem;
  padding: 0.5rem 0;
`;
