import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import speachBubble from '../../assets/speachBubble.svg';
import styled from 'styled-components';
import { useGetInvitation } from '../../api/useGetInvitation';
import theme from '../../style/theme';
import Button from '../common/Button';
import Input from '../common/Input';
import InvitationCard from '../common/InvitationCard';
import Modal from '../common/Modal';
import RespondButton from '../common/ResondButton';
import useGetMyAttendance from '../../api/useGetMyAttendance';
import ErrorPhrase from '../common/ErrorPhrase';
import AttendeeList from '../common/AttendeeList';

const calculateDDay = (targetDate: string) => {
  const today = dayjs().startOf('day');
  const target = dayjs(targetDate).startOf('day');

  const diff = target.diff(today, 'day');

  if (diff > 0) {
    return `D-${diff}`;
  } else if (diff < 0) {
    return `D+${Math.abs(diff)}`;
  } else {
    return 'D-Day';
  }
};

const AuthorizedView = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');
  const { data } = useGetMyAttendance(invitationId || '');
  const [myAttendance, setMyAttendance] = useState<boolean | null>(data?.attendance || null);

  // 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (data && data.attendance !== undefined) {
      setMyAttendance(data.attendance);
      console.log(myAttendance);
    }
  }, [data]);

  const [attendanceStatus, setAttendanceStatus] = useState({
    //TODO: 닉네임값 서버로부터 받아 수정
    nickname: '이름 없음',
    invitationId: invitationId || '',
    attendance: null,
  });

  return (
    <Container>
      {myAttendance === null && isModalOpen && (
        <Modal width={14.1825} hasCloseButton={false}>
          <div>초대장 확인을 위해서 닉네임을 입력해주세요</div>
          <NoGap>
            <Input
              width="14.1875rem"
              value={attendanceStatus.nickname}
              onChange={(e: any) =>
                setAttendanceStatus({
                  ...attendanceStatus,
                  nickname: e.target.value,
                })
              }
            />
            {attendanceStatus.nickname == '' ? (
              <SmallErrorPhrase message="닉네임을 입력해주세요" />
            ) : (
              <Space />
            )}
          </NoGap>
          <ConfirmButton
            size="small"
            color={theme.color.main}
            textColor="#fff"
            onClick={() => {
              if (attendanceStatus.nickname === '') return;
              setIsModalOpen(false);
            }}
          >
            확인
          </ConfirmButton>
        </Modal>
      )}

      {/* 응답 존재 여부에 따라 텍스트 변경 */}
      {myAttendance === null ? (
        <>
          <Title>{invitation?.ownerNickname}님의 초대를 받았습니다</Title>
          <Description>초대장을 확인하고 참석여부를 체크해주세요!</Description>
        </>
      ) : (
        <>
          <Title>우리 약속한 날에 만나자!</Title>
          <Bubble>
            <D_Day>
              <div>일정까지</div>
              <b>{calculateDDay(invitation?.schedule || '')}</b>
            </D_Day>
            <img src={speachBubble} alt="speachBubble" />
          </Bubble>
        </>
      )}

      <InvitationCard
        title={invitation?.title || ''}
        imgURL={invitation?.thumbnailUrl || ''}
        date={invitation?.schedule || ''}
        location={invitation?.location || ''}
        description={invitation?.remark || ''}
        // TODO: 컬러 값 수정 필요
        backgroundColor="#fff"
        fontColor="#000"
      />
      <TouchMessage>초대장을 터치해보세요</TouchMessage>

      {/* 응답이 존재할 경우 */}
      {myAttendance !== null && (
        <ButtonList>
          {isEdit ? (
            <>
              <RespondButton
                attendanceStatus={attendanceStatus}
                changeEditMode={() => {
                  setIsEdit(true);
                }}
              />
            </>
          ) : (
            <>
              <MyAnswer key={String(myAttendance)}>
                내 응답: {myAttendance ? 'yes!' : '거절'}
              </MyAnswer>
              <SelectButton
                size="medium"
                color={theme.color.main}
                textColor="#fff"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                응답 수정
              </SelectButton>
            </>
          )}
        </ButtonList>
      )}

      {/* 응답이 존재하지 않을 경우 */}
      {myAttendance === null && (
        <RespondButton
          attendanceStatus={attendanceStatus}
          changeEditMode={() => {
            setIsEdit(true);
          }}
        />
      )}
      <AttendeeList />
    </Container>
  );
};

export default AuthorizedView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  max-width: 480px;
  overflow-y: hidden;
`;

const Title = styled.div`
  margin-top: 1rem;
  color: #3e3e3e;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Description = styled.div`
  margin: 0.5rem 0 1.9rem 0;
  color: #787878;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Bubble = styled.div`
  margin-top: 0.81rem;
  margin-bottom: 0.5rem;
  position: relative;

  img {
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  }
`;

const D_Day = styled.div`
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 600;
  gap: 0.38rem;
  width: 8.5855rem;
  z-index: 1;

  b {
    font-size: 1.125rem;
    color: ${theme.color.main};
    padding-top: 0.03rem;
  }
`;

const TouchMessage = styled.div`
  margin-bottom: 1.75rem;
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const MyAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10.5rem;
  height: 3.125rem;
  border: 1px solid #cfcdcd;
  border-radius: 0.5rem;
  color: #787878;
  font-weight: 600;
`;

const Space = styled.div`
  height: 0.8125rem;
`;

const NoGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.31rem;
`;

const SmallErrorPhrase = styled(ErrorPhrase)`
  font-size: 0.625rem;
  display: flex;
`;

const ButtonList = styled.div`
  display: flex;
  gap: 0.38rem;
`;

const ConfirmButton = styled(Button)`
  width: 5.5625rem;
  padding: 0.5rem 0;
`;

const SelectButton = styled(Button)`
  width: 10.5rem;
  font-weight: 600;
`;
