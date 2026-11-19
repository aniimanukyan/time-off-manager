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

export type TimeOffRequest = {
  id: string;
  leaveType: LeaveType;
  start: IsoDate;
  end: IsoDate;
  days: number;
  status: RequestStatus;
  decision?: string;
};

export type Balance = {
  leaveType: LeaveType;
  value: number;
  unit: string;
  progress: number;
  note: string;
};
