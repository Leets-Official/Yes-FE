import theme from '../../style/theme';
import styled from 'styled-components';
import Button from './Button';
import { usePatchRespond } from '../../api/patchRespond';
import { toast } from 'react-toastify';

const RespondButton = ({
  attendanceStatus,
  changeEditMode,
  setAttendanceStatus,
  setMyAttendance,
}: {
  attendanceStatus: { nickname: string; invitationId: string };
  changeEditMode: () => void;
  setAttendanceStatus: React.Dispatch<
    React.SetStateAction<{ nickname: string; invitationId: string; attendance: boolean | null }>
  >;
  setMyAttendance: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { patchRespond } = usePatchRespond();

  return (
    <ButtonList>
      <SelectButton
        size="medium"
        color="#E6E6E6"
        textColor="#000"
        onClick={async () => {
          await patchRespond({ ...attendanceStatus, attendance: false });
          setAttendanceStatus({
            nickname: attendanceStatus.nickname,
            invitationId: attendanceStatus.invitationId,
            attendance: false,
          });
          setMyAttendance('거절');
          toast.success('응답이 정상적으로 수정되었습니다.');
          changeEditMode();
        }}
      >
        거절
      </SelectButton>
      <SelectButton
        size="medium"
        color={theme.color.main}
        textColor="#fff"
        onClick={async () => {
          await patchRespond({ ...attendanceStatus, attendance: true });
          setAttendanceStatus({
            nickname: attendanceStatus.nickname,
            invitationId: attendanceStatus.invitationId,
            attendance: true,
          });
          setMyAttendance('yes!');
          toast.success('응답이 정상적으로 수정되었습니다.');
          changeEditMode();
        }}
      >
        yes!
      </SelectButton>
    </ButtonList>
  );
};

export default RespondButton;

const ButtonList = styled.div`
  display: flex;
  gap: 0.38rem;
`;

const SelectButton = styled(Button)`
  width: 10.5rem;
  font-weight: 600;
`;
