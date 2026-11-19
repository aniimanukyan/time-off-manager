import { createContext, use } from 'react';

import type { NewTimeOffRequest, RequestStatus, Segment, TeamRequest } from '../types/timeOff';

import type { TimeOffState } from './timeOff';

export type TimeOffStore = TimeOffState & {
  loadList: (segment: Segment) => Promise<void>;
  submitRequest: (request: NewTimeOffRequest) => Promise<void>;
  decideRequest: (request: TeamRequest, status: RequestStatus, decision: string) => Promise<void>;
};

export const TimeOffContext = createContext({} as TimeOffStore);

export const useTimeOff = (): TimeOffStore => use(TimeOffContext);
