import type { Balance, LeaveType, NewTimeOffRequest, RequestSegment, TimeOffRequest } from '../types/timeOff';

import data from './employee.json';
import { mockResponse } from './mockResponse';

export const BALANCES = data.balances as Balance[];
export const BALANCE_BY_TYPE = Object.fromEntries(BALANCES.map((balance) => [balance.leaveType, balance])) as Record<
  LeaveType,
  Balance
>;

export const REQUESTS = { upcoming: [...data.upcoming], past: [...data.past] } as Record<
  RequestSegment,
  TimeOffRequest[]
>;

let nextId = 1;

export const submitRequest = (request: NewTimeOffRequest): Promise<TimeOffRequest> => {
  const created: TimeOffRequest = { ...request, id: `n${nextId++}`, status: 'Pending' };
  REQUESTS.upcoming.unshift(created);
  return mockResponse(created);
};
