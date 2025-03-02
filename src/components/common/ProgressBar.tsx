import styled, { keyframes } from 'styled-components';
import theme from '../../style/theme';
import progressIcon from '../../assets/progress.svg';

const widthAnimation = (progress: number) => keyframes`
  0% {
    width: ${(() => {
      switch (progress) {
        case 0:
          return '0%';
        case 1:
          return '25%';
        case 2:
          return '50%';
        case 3:
          return '50%';
        default:
          return '0%';
      }
    })()};
  }
  100% {
    width: ${(() => {
      switch (progress) {
        case 0:
          return '25%';
        case 1:
          return '50%';
        case 2:
          return '50%';
        case 3:
          return '75%';
        default:
          return '0%';
      }
    })()};
  }
`;

const IconAnimation = (progress: number) => keyframes`
  0% {
  left: ${(() => {
    switch (progress) {
      case 0:
        return '0%';
      case 1:
        return '25%';
      case 2:
        return '47%';
      case 3:
        return '47%';
      default:
        return '0%';
    }
  })()};
  }
  100% {
  left: ${(() => {
    switch (progress) {
      case 0:
        return '25%';
      case 1:
        return '47%';
      case 2:
        return '47%';
      case 3:
        return '69%';
      default:
        return '0%';
    }
  })()};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 21.375rem;
  height: 0.25rem;
  background-color: #d9d9d9;
  border-radius: 0.25rem;
  margin: 0.75rem 0;
  overflow: hidden;
`;

const ProgressIcon = styled.img<{ progress: number }>`
  position: absolute;
  animation: ${({ progress }) => IconAnimation(progress)} 0.3s ease-in-out forwards;

  transition: left 0.3s ease-in-out;
`;

const Bar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: ${theme.color.main};
  border-radius: 0.25rem;
  animation: ${({ progress }) => widthAnimation(progress)} 0.3s ease-in-out forwards;
`;

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Container>
      <ProgressIcon src={progressIcon} alt="!" progress={progress} />
      <Bar progress={progress} />
    </Container>
  );
};

export default ProgressBar;
