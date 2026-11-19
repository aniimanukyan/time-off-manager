import type { IsoDate } from '../types/timeOff';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseIsoDate = (iso: IsoDate): Date => new Date(`${iso}T00:00:00`);

export const toIsoDate = (value: string): IsoDate => value.slice(0, 10) as IsoDate;

const pad = (value: number): string => String(value).padStart(2, '0');

export const todayIso = (): IsoDate => {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}` as IsoDate;
};

export const pluralDays = (count: number, unit = 'day'): string => `${count} ${unit}${count === 1 ? '' : 's'}`;

export const formatLongDate = (iso: IsoDate): string => {
  const date = parseIsoDate(iso);
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const countWorkdays = (start: IsoDate, end: IsoDate): number => {
  const day = parseIsoDate(start);
  const last = parseIsoDate(end);
  let count = 0;
  while (day <= last) {
    const weekday = day.getDay();
    if (weekday !== 0 && weekday !== 6) {
      count++;
    }
    day.setDate(day.getDate() + 1);
  }
  return count;
};

export const formatShortRange = (start: IsoDate, end: IsoDate): string => {
  const first = parseIsoDate(start);
  const last = parseIsoDate(end);
  if (start === end) {
    return `${WEEKDAYS[first.getDay()]} ${first.getDate()} ${MONTHS[first.getMonth()]}`;
  }
  if (first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear()) {
    return `${first.getDate()} – ${last.getDate()} ${MONTHS[last.getMonth()]}`;
  }
  return `${first.getDate()} ${MONTHS[first.getMonth()]} – ${last.getDate()} ${MONTHS[last.getMonth()]}`;
};
