import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAccessToken } from '../../utils/isAccessToken';

export const MyPageHeader = () => {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const handleClose = () => {
    if (location.pathname.startsWith('/mypage/')) {
      const redirectUrl = localStorage.getItem('redirectUrl');
      redirectUrl ? navigate(redirectUrl) : navigate('/mypage');
      localStorage.removeItem('redirectUrl');
    } else if (location.pathname === '/mypage') {
      navigate('/home');
    } else if (location.pathname.startsWith('/result/')) {
      navigate('/home', { replace: true });
    } else {
      isAccessToken() ? navigate('/home') : navigate('/');
    }
  };
  return (
    <Section>
      <LeftButton
        className={
          currentUrl === '/mypage/received' || currentUrl === '/mypage/sent' ? 'visible' : 'hidden'
        }
        strokeWidth={2}
        size={24}
        onClick={() => navigate('/mypage')}
      />
      <HeaderTitle>
        {currentUrl === '/mypage/received' || currentUrl === '/mypage/sent' ? (
          currentUrl === '/mypage/received' ? (
            '받은 초대장'
          ) : (
            '보낸 초대장'
          )
        ) : (
          <img src="/image/small_yes.svg" />
        )}
      </HeaderTitle>

      <CloseIcon
        className={
          currentUrl === '/mypage/received' || currentUrl === '/mypage/sent' ? 'hidden' : 'visible'
        }
        strokeWidth={1}
        size={28}
        onClick={handleClose}
      />
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
  z-index: 1;
  background-color: white;
`;

const LeftButton = styled(FiChevronLeft)`
  width: 1.75rem;
  opacity: ${(props) => (props.className === 'hidden' ? 0 : 1)};
  pointer-events: ${(props) => (props.className === 'hidden' ? 'none' : 'auto')};
  visibility: visible;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  color: #3e3e3e;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  margin: 0 auto;
`;

const CloseIcon = styled(IoIosClose)`
  cursor: pointer;
  visibility: ${(props) => (props.className === 'hidden' ? 'hidden' : 'visible')};
`;
