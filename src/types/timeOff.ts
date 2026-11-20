import type { ThemeColor } from './theme';

export const LEAVE_TYPES = ['Vacation', 'Sick', 'Personal'] as const;
export type LeaveType = (typeof LEAVE_TYPES)[number];

export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  Vacation: 'Vacation',
  Sick: 'Sick leave',
  Personal: 'Personal day',
};

export const LEAVE_TYPE_COLORS = {
  Vacation: 'primary',
  Sick: 'sick',
  Personal: 'personal',
} as const satisfies Record<LeaveType, ThemeColor>;

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export type RequestSegment = 'upcoming' | 'past';
export type ApprovalSegment = 'pending' | 'decided';
export type Segment = RequestSegment | ApprovalSegment;

export type IsoDate = `${number}-${number}-${number}`;

export type DateRange = { start: IsoDate | ''; end: IsoDate | '' };

export type TimeOffRequest = {
  id: string;
  leaveType: LeaveType;
  start: IsoDate;
  end: IsoDate;
  days: number;
  status: RequestStatus;
  note?: string;
  decision?: string;
};

export type TeamRequest = TimeOffRequest & { employee: string };

/** Own requests have no `employee`; team requests do. */
export type LeaveRequest = TimeOffRequest | TeamRequest;

export type NewTimeOffRequest = Pick<TimeOffRequest, 'leaveType' | 'start' | 'end' | 'days' | 'note'>;

type BalanceBase = {
  leaveType: LeaveType;
  progress: number;
};

export type Balance =
  (BalanceBase & { limit: number; available: number }) | (BalanceBase & { limit: null; used: number });
