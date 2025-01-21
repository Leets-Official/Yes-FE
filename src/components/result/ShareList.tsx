import styled from 'styled-components';
import CopyLinkButton from './CopyLinkButton';
import KakoShareButton from './KaKaoShareButton';
import QRShareButton from './QRShareButton';

const ShareList = ({ imgURL }: { imgURL: string }) => {
  return (
    <Container>
      <CopyLinkButton />
      <KakoShareButton imgURL={imgURL} />
      <QRShareButton />
    </Container>
  );
};

export default ShareList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3.56rem;
  gap: 2.69rem;
`;
