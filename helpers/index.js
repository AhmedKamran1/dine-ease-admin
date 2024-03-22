import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const getFileUrl = (bucket, key) => {
  return `https://${bucket}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;
};

export const getError = (e) => {
  return e.response?.data?.message || e?.message || 'Server Error, try again later ';
};

export const getTimePassed = (time) => {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
};

export const getDate = (time) => {
  return dayjs(time).locale('en').format('DD MMMM YYYY');
};
