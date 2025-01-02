import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export const HomeHeader = () => {
  const currentUrl = window.location.href.split('/').reverse()[0];

  return (
    <Section>
      {currentUrl === 'home' && (
        <MyPageLink to="/mypage">
          <TbUserCircle strokeWidth={1} color="#3E3E3E" />
        </MyPageLink>
      )}
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-left: auto;
`;

const MyPageLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 32px;
  gap: 3px;
  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
  }
`;
