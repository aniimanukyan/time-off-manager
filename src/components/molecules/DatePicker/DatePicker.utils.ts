import type { DateRange, IsoDate } from '../../../types/timeOff';

type Highlight = { textColor: string; backgroundColor: string };

const EDGE: Highlight = {
  textColor: 'var(--ion-color-primary-contrast)',
  backgroundColor: 'var(--ion-color-primary)',
};

const BETWEEN: Highlight = {
  textColor: 'var(--ion-color-notice-contrast)',
  backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.1)',
};

export const isPickingEnd = ({ start, end }: DateRange): boolean => !!start && !end;

export const getHighlight = ({ start, end }: DateRange, day: IsoDate): Highlight | undefined => {
  if (day === start || day === end) return EDGE;
  if (start && end && day > start && day < end) return BETWEEN;
  return undefined;
};

export const nextRange = (range: DateRange, day: IsoDate): DateRange =>
  isPickingEnd(range) && day >= range.start ? { start: range.start, end: day } : { start: day, end: '' };
