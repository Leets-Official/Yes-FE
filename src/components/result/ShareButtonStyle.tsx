import styled, { css } from 'styled-components';

export const Container = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  flex-direction: column;
  gap: 0.31rem;

  div {
    font-size: 0.75rem;
  }

  div {
    ${({ size }) => {
      switch (size) {
        case 'small':
          return css`
            font-size: 0.75rem;
          `;
        case 'big':
          return css`
            font-size: 0.625rem;
          `;
      }
    }}
  }
`;

export const ButtonImg = styled.button<{ size: 'small' | 'big' }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    ${({ size }) => {
      switch (size) {
        case 'small':
          return css`
            width: 1.95556rem;
            height: 1.95556rem;
          `;
        case 'big':
          return css`
            width: 2.75rem;
            height: 2.75rem;
          `;
      }
    }}
  }
`;
