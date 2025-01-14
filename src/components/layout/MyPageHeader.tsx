import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

export const MyPageHeader = () => {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const handleClose = () => {
    if (location.pathname.startsWith('/mypage/detail/')) {
      navigate(-1);
    } else if (location.pathname === '/mypage') {
      navigate('/home');
    }
  };

  return (
    <Section>
      <FiChevronLeft
        className={
          currentUrl === '/mypage/received' || currentUrl === '/mypage/send'
            ? 'back'
            : 'back hidden'
        }
        strokeWidth={2}
        size={24}
        onClick={() => navigate('/mypage')}
      />
      <HeaderTitle>
        {currentUrl === '/mypage/received' || currentUrl === '/mypage/send' ? (
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
          currentUrl === '/mypage/received' || currentUrl === '/mypage/send'
            ? 'back hidden'
            : 'back'
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
  margin-bottom: 2.625rem;

  > svg.back.hidden {
    visibility: hidden;
  }
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
  margin-right: 1.19rem;
  cursor: pointer;
`;
