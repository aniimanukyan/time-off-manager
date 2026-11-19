import type { IsoDate } from '../types/timeOff';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseIsoDate = (iso: IsoDate): Date => new Date(`${iso}T00:00:00`);

export const toIsoDate = (value: string): IsoDate => value.slice(0, 10) as IsoDate;

const pad = (n: number): string => String(n).padStart(2, '0');

export const todayIso = (): IsoDate => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` as IsoDate;
};

export const pluralDays = (n: number, unit = 'day'): string => `${n} ${unit}${n === 1 ? '' : 's'}`;

export const formatLongDate = (iso: IsoDate): string => {
  const d = parseIsoDate(iso);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const countWorkdays = (start: IsoDate, end: IsoDate): number => {
  const day = parseIsoDate(start);
  const last = parseIsoDate(end);
  let count = 0;
  while (day <= last) {
    const weekday = day.getDay();
    if (weekday !== 0 && weekday !== 6) count++;
    day.setDate(day.getDate() + 1);
  }
  return count;
};

export const formatShortRange = (start: IsoDate, end: IsoDate): string => {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  if (start === end) return `${WEEKDAYS[a.getDay()]} ${a.getDate()} ${MONTHS[a.getMonth()]}`;
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${a.getDate()} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
  }
  return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
};
