// Mock data for the Employee view until there is a backend.
// employee.json mirrors the response of the future endpoint.
import type { Balance, TimeOffRequest } from '../types/timeOff';

import data from './employee.json';

export const BALANCES = data.balances as Balance[];

// Stand-ins for the future endpoints. The delay mimics the network so loading states are visible.
const respond = <T>(value: T): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(value), 400));

export const fetchUpcomingRequests = (): Promise<TimeOffRequest[]> => respond(data.upcoming as TimeOffRequest[]);
export const fetchPastRequests = (): Promise<TimeOffRequest[]> => respond(data.past as TimeOffRequest[]);
