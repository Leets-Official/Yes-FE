import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 20rem;
  min-height: 50px;
  margin: 4rem 2.2rem;
  background-color: #ffe479;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
`;

const KakaoLoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <StyledButton onClick={onClick}>카카오로 로그인하기</StyledButton>;
};

export default KakaoLoginButton;
