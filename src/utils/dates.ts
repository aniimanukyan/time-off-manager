import type { IsoDate } from '../types/timeOff';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parses YYYY-MM-DD as a local date (no timezone shift). */
const parseIsoDate = (iso: IsoDate): Date => new Date(`${iso}T00:00:00`);

export const pluralDays = (n: number): string => `${n} ${n === 1 ? 'day' : 'days'}`;

/** List rows: "Fri 4 Dec", "21 – 30 Dec", "28 Dec – 3 Jan". */
export const formatShortRange = (start: IsoDate, end: IsoDate): string => {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  if (start === end) return `${WEEKDAYS[a.getDay()]} ${a.getDate()} ${MONTHS[a.getMonth()]}`;
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${a.getDate()} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
  }
  return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
};
