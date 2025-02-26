import styled from 'styled-components';

const Skeleton = ({ width, height }: { width: string; height: string }) => {
  return <SkeletonComponent width={width} height={height} />;
};

export default Skeleton;

const SkeletonComponent = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 8px;
  background: linear-gradient(
    120deg,
    rgba(245, 245, 245, 1) 0%,
    #ffffffae 10%,
    rgba(245, 245, 245, 1) 20%
  );
  animation: loading 1.5s infinite linear;
`;
