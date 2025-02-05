import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const getISOString = (date: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}) => {
  const { year, month, day, hour, minute } = date;

  // 값이 존재하면서 0이 아닌지 체크
  if (year && Number(month) > 0 && Number(day) > 0 && Number(hour) >= 0 && Number(minute) >= 0) {
    const kstDate = dayjs(`${year}-${month}-${day} ${hour}:${minute}`).tz('Asia/Seoul', true);
    if (!kstDate.isValid()) {
      return null;
    }
    const isoDate = kstDate.format('YYYY-MM-DDTHH:mm:ss.SSS');
    return isoDate;
  } else {
    return null;
  }
};

export default getISOString;
