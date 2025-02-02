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

  if (year && month && day && hour && minute) {
    const kstDate = dayjs(`${year}-${month}-${day} ${hour}:${minute}`).tz('Asia/Seoul', true);

    const isoDate = kstDate.format('YYYY-MM-DDTHH:mm:ss.SSS');

    console.log('ISO 8601 (KST):', isoDate);
    return isoDate;
  } else {
    return null;
  }
};

export default getISOString;
