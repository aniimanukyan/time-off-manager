import { PAGE_SIZE, type Page } from '../types/pagination';
import type {
  Balance,
  LeaveRequest,
  LeaveType,
  NewTimeOffRequest,
  RequestStatus,
  Segment,
  TeamRequest,
  TimeOffRequest,
} from '../types/timeOff';

import employee from './employee.json';
import { mockResponse } from './mockResponse';
import supervisor from './supervisor.json';

const db = {
  upcoming: employee.upcoming,
  past: employee.past,
  pending: supervisor.pending,
  decided: supervisor.decided,
} as Record<Segment, LeaveRequest[]>;

export const BALANCES = Object.fromEntries(employee.balances.map((balance) => [balance.leaveType, balance])) as Record<
  LeaveType,
  Balance
>;

const PAGINATED: Segment[] = ['pending', 'decided'];

export const fetchPage = (segment: Segment, offset: number): Promise<Page> =>
  mockResponse({
    items: db[segment].slice(offset, PAGINATED.includes(segment) ? offset + PAGE_SIZE : undefined),
    total: db[segment].length,
  });

export const createRequest = (request: NewTimeOffRequest): Promise<TimeOffRequest> => {
  const created: TimeOffRequest = { ...request, id: crypto.randomUUID(), status: 'Pending' };
  db.upcoming = [created, ...db.upcoming];
  return mockResponse(created);
};

export const decideRequest = (request: TeamRequest, status: RequestStatus, decision: string): Promise<TeamRequest> => {
  const decided: TeamRequest = { ...request, status, decision: decision || undefined };
  db.pending = db.pending.filter((r) => r.id !== request.id);
  db.decided = [decided, ...db.decided];
  return mockResponse(decided);
};
