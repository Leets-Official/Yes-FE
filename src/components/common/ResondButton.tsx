import theme from '../../style/theme';
import styled from 'styled-components';
import Button from './Button';
import { usePatchRespond } from '../../api/patchRespond';

const RespondButton = ({
  attendanceStatus,
  changeEditMode,
}: {
  attendanceStatus: { nickname: string; invitationId: string };
  changeEditMode: () => void;
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
