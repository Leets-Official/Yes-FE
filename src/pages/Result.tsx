import styled from 'styled-components';
import ShareList from '../components/result/ShareList';
import { MyPageHeader } from '../components/layout/MyPageHeader';
import InvitationCard from '../components/common/InvitationCard';
// import { template } from '../data/Template';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { InvitationInfo } from '../atom/InvitationInfo';
import { useParams, data } from 'react-router-dom';
import { useGetInvitation } from '../api/useGetInvitation';

const Result = () => {
  const resetInvitationInfo = useResetRecoilState(InvitationInfo);

  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');

  useEffect(() => {
    sessionStorage.removeItem('invitationPersist');
    resetInvitationInfo();
  }, []);

  return (
    <Container>
      <MyPageHeader />
      <Title>초대장 생성 완료!</Title>
      <InvitationCard
        imgURL={invitation?.thumbnailUrl || ''}
        title={invitation?.title || ''}
        date={invitation?.schedule || ''}
        location={invitation?.location || ''}
        description={invitation?.remark || ''}
        // TODO: 템플릿 값으로 수정 필요
        // backgroundColor={template[data.templateKey].bg_color}
        // fontColor={template[data.templateKey].bg_text_color}
        backgroundColor="#fff"
        fontColor="#000"
      />
      <TouchMessage>초대장을 터치해주세요!</TouchMessage>
      {/* TODO: 닉네임 값 수정 필요 -> invitation.ownerNickname */}
      <ShareList ownerNickname="닉네임" thumbnailUrl={invitation?.thumbnailUrl || ''} size="big" />
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
  padding: 0 5%;
`;

const Title = styled.div`
  color: #3e3e3e;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.75rem 0 1.31rem 0;
`;

const TouchMessage = styled.div`
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;
