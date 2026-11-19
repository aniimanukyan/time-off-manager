export const LEAVE_TYPES = ['Vacation', 'Sick', 'Personal'] as const;
export type LeaveType = (typeof LEAVE_TYPES)[number];

export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  Vacation: 'Vacation',
  Sick: 'Sick leave',
  Personal: 'Personal day',
};

export const LEAVE_TYPE_COLORS: Record<LeaveType, string> = {
  Vacation: 'primary',
  Sick: 'sick',
  Personal: 'personal',
};

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export const REQUEST_SEGMENTS = ['upcoming', 'past'] as const;
export type RequestSegment = (typeof REQUEST_SEGMENTS)[number];

export type IsoDate = `${number}-${number}-${number}`;

/** A range being picked; an empty string means that end is not chosen yet. */
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

export type NewTimeOffRequest = Pick<TimeOffRequest, 'leaveType' | 'start' | 'end' | 'days' | 'note'>;

type BalanceBase = {
  leaveType: LeaveType;
  progress: number;
};

export type Balance =
  (BalanceBase & { limit: number; available: number }) | (BalanceBase & { limit: null; used: number });

export const describeBalance = (balance: Balance): { value: number; unit: string } =>
  balance.limit === null
    ? { value: balance.used, unit: 'used' }
    : { value: balance.available, unit: `of ${balance.limit}` };
