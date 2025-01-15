import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { InvitationInfo } from '../atom/InvitationInfo';
import { useNavigate } from 'react-router-dom';

export const useResetStepState = () => {
  const navigate = useNavigate();
  const [invitation, setInvitation] = useRecoilState(InvitationInfo); // 초대장 정보

  useEffect(() => {
    // (초대장 정보 입력 중) 브라우저 뒤로가기 이벤트 발생 시, 단계 별 정보 초기화 함수
    const handleReset = () => {
      if (invitation.step === 0) {
        setInvitation((prev) => ({ ...prev, nickname: '' }));
        navigate('/home');
      } else if (invitation.step === 1) {
        setInvitation((prev) => ({ ...prev, step: 0, isTemplate: true, templateKey: 'ALIEN' }));
        navigate('/invitation/create');
      } else if (invitation.step === 2) {
        setInvitation((prev) => ({ ...prev, step: 1, contents: [] }));
        navigate('/invitation/create');
      } else if (invitation.step === 3) {
        if (invitation.isTemplate === false) {
          setInvitation((prev) => ({
            ...prev,
            step: 1,
            isTemplate: true,
            templateKey: 'ALIEN',
            title: '',
            date: '',
            location: '',
            description: '',
          }));
          navigate('/invitation/create');
        } else {
          setInvitation((prev) => ({
            ...prev,
            step: 2,
            title: '',
            date: '',
            location: '',
            description: '',
          }));
          navigate('/invitation/create');
        }
      }
    };

    window.addEventListener('popstate', handleReset);

    return () => {
      window.removeEventListener('popstate', handleReset);
    };
  }, [invitation.step, setInvitation]);
};
