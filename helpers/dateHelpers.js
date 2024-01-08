import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const getTimePassed = (time) => {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
};

export const getDate = (time) => {
  return dayjs(time).locale('en').format('DD MMMM YYYY');
};
