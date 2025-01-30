import { TemplateType } from '../type/TemplateType';

export const template: TemplateType = {
  ALIEN: {
    template_src: '/image/Invi_Alien.png', // 1. 템플릿 이미지 파일 (텍스트 X)
    template_pre_src: '/image/Pre_Invi_Alien.png', // 2. 템플릿 미리보기 이미지 파일 (텍스트 O)
    font: 'BMHANNAPro',
    text_cnt: 4, // 3. 포함되는 텍스트창 개수
    text_attr: [
      [78, 83, 167, 25, 18, '#3E3E3E', 1628, 1000],
      [222, 54, 91, 20, 14, '#3E3E3E', 1000, 2400],
      [286, 54, 91, 20, 14, '#3E3E3E', 1000, 3000],
      [326, 48, 103, 35, 14, '#3E3E3E', 1000, 3300],
    ], // 4. 각 텍스트창 속성 (top,left,width,height,font-size,font-color,x,y)
    //x,y의 경우 이미지 저장을 위한 실제 사이즈(3277*4096에 대한 위치임)
    bg_color: '#C8F58E', // 5. 초대장 뒷면 배경 컬러
    bg_text_color: '#3E3E3E', // 6. 초대장 뒷면 텍스트 컬러
  },
  RABBIT: {
    template_src: '/image/Invi_Rabbit.png',
    template_pre_src: '/image/Pre_Invi_Rabbit.png',
    font: 'CookieRun-Regular',
    text_cnt: 5,
    text_attr: [
      [83, 98, 111, 34, 24, '#3E3E3E', 0, 0],
      [135, 55, 210, 63, 13, '#3E3E3E', 0, 0],
      [215, 138, 91, 20, 13, '#3E3E3E', 0, 0],
      [240, 138, 91, 20, 13, '#3E3E3E', 0, 0],
      [312, 68, 92, 34, 14, '#3E3E3E', 0, 0],
    ],
    bg_color: '#FF6666',
    bg_text_color: '#FFFFFF',
  },
  CYBER: {
    template_src: '/image/Invi_Cyber.png',
    template_pre_src: '/image/Pre_Invi_Cyber.png',
    font: 'DOSIyagiMedium',
    text_cnt: 4,
    text_attr: [
      [109, 81, 166, 28, 20, '#000000', 0, 0],
      [148, 101, 121, 20, 14, '#000000', 0, 0],
      [171, 101, 121, 20, 14, '#000000', 0, 0],
      [206, 60, 210, 63, 14, '#000000', 0, 0],
    ],
    bg_color: '#80EDFF',
    bg_text_color: '#3E3E3E',
  },
  CHIRASHI: {
    template_src: '/image/Invi_Chirashi.png',
    template_pre_src: '/image/Pre_Invi_Chirashi.png',
    font: 'Pretendard-Regular',
    text_cnt: 3,
    text_attr: [
      [43, 82, 221, 59, 30, '#3E3E3E', 0, 0],
      [179, 43, 235, 122, 20, '#F4F7FF', 0, 0],
      [323, 45, 228, 33, 24, '#FFFF3B', 0, 0],
    ],
    bg_color: '#3E68FF',
    bg_text_color: '#FFFFFF',
  },
  PRINCESS: {
    template_src: '/image/Invi_Princess.png',
    template_pre_src: '/image/Pre_Invi_Princess.png',
    font: 'Ownglyph_ParkDaHyun',
    text_cnt: 1,
    text_attr: [[203, 43, 235, 65, 20, '#3E3E3E', 0, 0]],
    bg_color: '#FF5596',
    bg_text_color: '#FFFFFF',
  },
  RECEIPT: {
    template_src: '/image/Invi_Receipt.png',
    template_pre_src: '/image/Pre_Invi_Receipt.png',
    font: 'Pretendard',
    text_cnt: 4,
    text_attr: [
      [151, 98, 124, 25, 18, '#3E3E3E', 0, 0],
      [259, 121, 129, 20, 12, '#3E3E3E', 0, 0],
      [286, 121, 129, 20, 12, '#3E3E3E', 0, 0],
      [313, 121, 129, 20, 12, '#3E3E3E', 0, 0],
    ],
    bg_color: '#FF8383',
    bg_text_color: '#FFFFFF',
  },
};
