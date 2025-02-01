import dayjs from 'dayjs';

const getISOString = (date: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}) => {
  const { year, month, day, hour, minute } = date;

  if (year && month && day && hour && minute) {
    const isoDate = dayjs(`${year}-${month}-${day} ${hour}:${minute}`).toISOString();
    console.log(isoDate);
    return isoDate;
  } else {
    console.log('올바른 날짜와 시간을 입력하세요.');
    return null;
  }
};

export default getISOString;
