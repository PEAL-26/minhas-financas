import { dayjs } from './dayjs';

export function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return dayjs(date).format('dddd, D [de] MMMM [de] YYYY');
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }

  return !isNaN(date.getTime());
}
