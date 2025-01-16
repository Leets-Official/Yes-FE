export const template = {
  ALIEN: {
    template_src: '/image/Invi_Alien.png', // 1. 템플릿 이미지 파일 (텍스트 X)
    template_pre_src: '/image/Pre_Invi_Alien.png', // 2. 템플릿 미리보기 이미지 파일 (텍스트 O)
    font: 'BMHANNAPro',
    text_cnt: 4, // 3. 포함되는 텍스트창 개수
    text_position_size: [
      [78, 83, 167, 25],
      [222, 54, 91, 20],
      [286, 54, 91, 20],
      [326, 48, 103, 35],
    ], // 4. 각 텍스트창 속성 (top,left,width,height)
    bg_color: '#04FD0B', // 5. 초대장 뒷면 배경 컬러
    bg_text_color: '#FFFFFF', // 6. 초대장 뒷면 텍스트 컬러
  },
  RABBIT: {
    template_src: '/image/Invi_Rabbit.png',
    template_pre_src: '/image/Pre_Invi_Rabbit.png',
    font: 'CookieRun-Regular',
    text_cnt: 5,
    text_position_size: [
      [83, 98, 111, 34],
      [135, 55, 210, 63],
      [207, 138, 91, 20],
      [207, 138, 91, 20],
      [312, 68, 92, 34],
    ],
    bg_color: '#FF6666',
    bg_text_color: '#FFFFFF',
  },
  CYBER: {
    template_src: '/image/Invi_Cyber.png',
    template_pre_src: '/image/Pre_Invi_Cyber.png',
    font: 'DOSIyagiMedium',
    text_cnt: 4,
    text_position_size: [
      [109, 81, 166, 28],
      [148, 101, 121, 20],
      [171, 101, 121, 20],
      [206, 60, 210, 63],
    ],
    bg_color: '#80EDFF',
    bg_text_color: '#FFFFFF',
  },
  CHIRASHI: {
    template_src: '/image/Invi_Chirashi.png',
    template_pre_src: '/image/Pre_Invi_Chirashi.png',
    font: 'Pretendard-Regular',
    text_cnt: 3,
    text_position_size: [
      [43, 82, 221, 59],
      [179, 43, 235, 122],
      [323, 45, 228, 33],
    ],
    bg_color: '#3E68FF',
    bg_text_color: '#FFFFFF',
  },
  PRINCESS: {
    template_src: '/image/Invi_Princess.png',
    template_pre_src: '/image/Pre_Invi_Princess.png',
    font: 'Ownglyph_ParkDaHyun',
    text_cnt: 1,
    text_position_size: [[203, 43, 235, 65]],
    bg_color: '#FF5596',
    bg_text_color: '#FFFFFF',
  },
  RECEIPT: {
    template_src: '/image/Invi_Receipt.png',
    template_pre_src: '/image/Pre_Invi_Receipt.png',
    font: 'Pretendard',
    text_cnt: 4,
    text_position_size: [
      [151, 98, 124, 25],
      [259, 121, 129, 20],
      [286, 121, 129, 20],
      [313, 121, 129, 20],
    ],
    bg_color: '#FF8383',
    bg_text_color: '#FFFFFF',
  },
};
