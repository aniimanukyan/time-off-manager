export type LeaveType = 'Vacation' | 'Sick' | 'Personal';

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
