import type { ComponentProps } from 'react';

import { BALANCE_BY_TYPE } from '../../../data/employee';
import {
  LEAVE_TYPE_LABELS,
  describeBalance,
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

export const getHint = (leaveType: LeaveType): string => {
  const { value, unit } = describeBalance(BALANCE_BY_TYPE[leaveType]);
  return `Balance: ${value} ${unit}`;
};

type Summary = {
  tone: ComponentProps<typeof InfoBanner>['tone'];
  title: string;
  text: string;
};

export const getSummary = (leaveType: LeaveType, days: number): Summary => {
  if (days === 0) return { tone: 'err', title: 'No working days selected', text: 'These dates fall on a weekend.' };

  const title = pluralDays(days, 'working day');
  const balance = BALANCE_BY_TYPE[leaveType];
  if (balance.limit === null) {
    return { tone: 'ok', title, text: `${LEAVE_TYPE_LABELS[leaveType]} has no annual limit.` };
  }

  const left = balance.available - days;
  if (left < 0) {
    return { tone: 'warn', title, text: `That’s ${-left} more than you have. It can still be approved as unpaid.` };
  }
  return { tone: 'ok', title, text: `You’ll have ${left} left after approval.` };
};
