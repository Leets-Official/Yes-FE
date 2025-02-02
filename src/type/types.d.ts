// 템플릿 타입
declare global {
  type Template = {
    template_src: string; // 템플릿 이미지 경로
    text_cnt: number; // 텍스트 개수
    text_position: [number, number][]; // 각 텍스트의 위치 (top, left)
    bg_color: string; // 템플릿 배경색
    bg_text_color: string; // 텍스트 색상
  };
  type Templates = {
    [key: string]: Template;
  };
  type Invitation = {
    ownerNickname: string;
    invitationId: string;
    thumbnailUrl: string;
    title: string;
    schedule: string;
    location: string;
    createDate: string;
    remark: string;
  };
  type Guest = {
    guestId: string;
    nickname: string;
  };
}

export {};
