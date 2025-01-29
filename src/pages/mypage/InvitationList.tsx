import { useState, useEffect } from 'react';
import InvitationOverview from '../../components/mypage/InvitationOverview';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';
import theme from '../../style/theme';
import Button from '../../components/common/Button';
import { receivedInvatationListAPI, sendInvatationListAPI } from '../../api';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../../atom/UserInfo';
import { useErrorBoundary } from 'react-error-boundary';

interface Invitation {
  invitationId: string;
  thumbnailUrl: string | null;
  title: string;
  schedule: string;
  location: string;
  createDate: string;
  remark: string;
}

// locale 데이터 => YYYY.MM.DD 변환 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const InvitationList = ({ type }: { type: string }) => {
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();

  const [invitationList, setInvitationList] = useState<Invitation[]>([]); // 초대장 리스트
  const [groupedInvitations, setGroupedInvitations] = useState<Record<string, Invitation[]>>({}); // 날짜별 그룹 초대장 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); // 초대장 삭제 모달 오픈 여부
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null); // 삭제선택된 초대장 ID
  const [isEmpty, setIsEmpty] = useState(true); // 초대장이 존재하는지 여부 체크

  const handleDeleteInvitation = (id: string) => {
    // 삭제 API
    console.log(id);
    // 모달 닫기
    setIsModalOpen(false);
  };

  const openDeleteModal = (id: string) => {
    setSelectedInvitationId(id); // 삭제할 초대장의 id를 선택
    setIsModalOpen(true); // 모달 열기
  };

  useEffect(() => {
    if (type === 'received' || type === 'send') {
      // 받은 초대장/보낸 초대장 불러오기
      if (type === 'received') {
        receivedInvatationListAPI(resetUserInfo, showBoundary).then((res) => {
          if (res.isSuccess && res.result !== null) {
            setInvitationList(res.result);
          }
        });
      } else if (type === 'send') {
        sendInvatationListAPI(resetUserInfo, showBoundary).then((res) => {
          if (res.isSuccess && res.result !== null) {
            setInvitationList(res.result);
          }
        });
      }
    }
  }, [type]);

  useEffect(() => {
    // invitationList가 변경되면 이 부분에서 그룹화 작업
    if (invitationList.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      // invitationList를 createDate 기준으로 내림차순 정렬
      const sortedInvitationList = [...invitationList].sort((a, b) => {
        return new Date(b.createDate).getTime() - new Date(a.createDate).getTime(); // 최신순 정렬
      });

      // createDate 별로 그룹화
      const grouped = sortedInvitationList.reduce(
        (acc, invitation) => {
          const formattedDate = formatDate(invitation.createDate); // YYYY.MM.DD 형식으로 변환.
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

  return (
    <>
      {isEmpty ? (
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
                formatDate={formatDate}
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
