import type { ComponentProps } from 'react';

import {
  LEAVE_TYPE_LABELS,
  describeBalance,
  type Balance,
  type DateRange,
  type LeaveType,
  type NewTimeOffRequest,
} from '../../../types/timeOff';
import { countWorkdays, pluralDays } from '../../../utils/dates';
import type { InfoBanner } from '../../atoms';

export type Draft = DateRange & { leaveType: LeaveType; note: string };

export const EMPTY_DRAFT: Draft = { leaveType: 'Vacation', start: '', end: '', note: '' };

export const toNewRequest = ({ leaveType, start, end, note }: Draft): NewTimeOffRequest | undefined =>
  start && end ? { leaveType, start, end, days: countWorkdays(start, end), note: note.trim() || undefined } : undefined;

export const getHint = (balance: Balance): string => {
  const { value, unit } = describeBalance(balance);
  return `Balance: ${value} ${unit}`;
};

type Summary = {
  tone: ComponentProps<typeof InfoBanner>['tone'];
  title: string;
  text: string;
};

export const getSummary = (balance: Balance, days: number): Summary => {
  if (days === 0) return { tone: 'err', title: 'No working days selected', text: 'These dates fall on a weekend.' };

  const title = pluralDays(days, 'working day');
  if (balance.limit === null) {
    return { tone: 'ok', title, text: `${LEAVE_TYPE_LABELS[balance.leaveType]} has no annual limit.` };
  }

  const left = balance.available - days;
  if (left < 0) {
    return { tone: 'warn', title, text: `That’s ${-left} more than you have. It can still be approved as unpaid.` };
  }
  return { tone: 'ok', title, text: `You’ll have ${left} left after approval.` };
};
