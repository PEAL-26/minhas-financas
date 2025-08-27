import { dayjs } from './dayjs';

export function formatDate(
  date: string | Date | undefined | null,
  format = 'dddd, D [de] MMMM [de] YYYY',
) {
  if (!date) {
    return '';
  }

  const newDate = new Date(date);
  return dayjs(newDate).format(format);
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }

  return !isNaN(date.getTime());
}
