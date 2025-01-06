import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';

export const InvitationHeader = () => {
  return (
    <Section>
      <FiChevronLeft strokeWidth={2} size={24} />
      <HeaderTitle>초대장 만들기</HeaderTitle>
      <IoIosClose strokeWidth={1} size={28} />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
`;

const HeaderTitle = styled.div`
  color: #3e3e3e;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
`;
