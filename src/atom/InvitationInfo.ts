import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'invitationPersist', storage: sessionStorage });

/**
 * [ 초대장 정보 recoil Atom]
 * step : 초대장 입력 단계
 * nickname : 닉네임
 * isTemplate : 초대장 템플릿 사용여부
 * templeteKey : 템플릿 키 (선택)
 * imageFile : 이미지(=템플릿) 파일 (선택)
 * imageUrl : 미리보기 용 이미지 url (선택)
 * contents[] : 템플릿 내 텍스트 내용 (선택)
 * title : 초대장 제목
 * date : 초대장 일자  (YYYY-MM-DD-HH-MM)
 * location : 초대장 장소
 * description : 초대장 부가 내용
 */
export interface InvitationState {
  step: number;
  nickname: string;
  isTemplate: boolean;
  templateKey: string | null;
  imageFile: File | null;
  imageUrl?: string;
  contents: string[];
  title: string;
  date: string;
  location: string;
  description: string;
}

// 초대장 초기값
export const initialInvitation = {
  step: 0,
  nickname: '',
  isTemplate: true,
  templateKey: 'ALIEN',
  imageFile: null,
  imageUrl: '',
  contents: [],
  title: '',
  date: '',
  location: '',
  description: '',
};

export const InvitationInfo = atom<InvitationState>({
  key: 'invitationInfo', // atom 고유 키 (local key)
  default: initialInvitation,
  effects_UNSTABLE: [persistAtom], // persistAtom을 통해 상태 지속화
});
