import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { InvitationInfo, initialInvitation } from '../../atom/InvitationInfo';
import { useNavigate } from 'react-router-dom';

export const InvitationHeader = () => {
  const navigate = useNavigate();
  const [invitation, setInvitation] = useRecoilState(InvitationInfo);

  const handleInvitationBack = () => {
    if (!invitation.isTemplate && invitation.step === 3) {
      setInvitation((prev) => ({ ...prev, step: invitation.step - 2 }));
    } else {
      setInvitation((prev) => ({ ...prev, step: invitation.step - 1 }));
    }
  };

  const handleInvitationReset = () => {
    setInvitation(initialInvitation); // X(닫기) 버튼 클릭 시, 상태 초기화
    navigate('/home', { replace: true });
  };

  return (
    <Section>
      <FiChevronLeft
        className={invitation.step === 0 ? 'back hidden' : 'back'}
        strokeWidth={2}
        size={24}
        onClick={handleInvitationBack}
      />
      <HeaderTitle>초대장 만들기</HeaderTitle>
      <IoIosClose strokeWidth={1} size={28} onClick={handleInvitationReset} />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;
  max-width: 480px;

  > svg.back.hidden {
    visibility: hidden;
  }
`;

const HeaderTitle = styled.div`
  color: #3e3e3e;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  margin: 0 auto;
`;
