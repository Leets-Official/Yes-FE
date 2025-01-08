import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  textColor?: string;
  border?: string;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  padding: 1rem 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  // By Size
  ${({ size }) =>
    size === 'small' &&
    css`
      padding: 0.8rem 0.8rem;
      font-size: 0.8rem;
    `}

  ${({ size }) =>
    size === 'medium' &&
    css`
      padding: 1rem 1.2rem;
      font-size: 1rem;
    `}
  
  ${({ size }) =>
    size === 'large' &&
    css`
      padding: 1.2rem 1.5rem;
      font-size: 2rem;
    `}
  

    ${({ color, textColor, border }) => css`
    background-color: ${color || '#ffc0df'};
    color: ${textColor || 'black'};
    border: ${border || 'none'};

    &:hover {
      opacity: 0.8;
    }
  `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  size,
  color,
  textColor,
  border,
  fullWidth,
  children,
  ...props
}) => {
  return (
    <StyledButton
      size={size}
      color={color}
      textColor={textColor}
      border={border}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
