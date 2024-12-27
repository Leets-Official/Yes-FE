import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeHeader = () => {
  // 마이페이지 별도 아이콘 추가 예정정
  return (
    <Section>
      <MyPageLink to="/mypage">마이페이지</MyPageLink>
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
  gap: 3px;
  cursor: pointer;
`;
