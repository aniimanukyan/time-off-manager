import { BALANCES } from '../api/timeOff';
import type { Page } from '../types/pagination';
import type { Balance, LeaveRequest, LeaveType, Segment, TeamRequest, TimeOffRequest } from '../types/timeOff';

export type TimeOffState = {
  balances: Record<LeaveType, Balance>;
  lists: Partial<Record<Segment, Page>>;
};

export type TimeOffAction =
  | { type: 'pageLoaded'; segment: Segment; offset: number; items: LeaveRequest[]; total: number }
  | { type: 'requestSubmitted'; request: TimeOffRequest }
  | { type: 'requestDecided'; request: TeamRequest };

export const initialState: TimeOffState = { balances: BALANCES, lists: {} };

const prepend = (page: Page | undefined, item: LeaveRequest): Page | undefined =>
  page && { items: [item, ...page.items], total: page.total + 1 };

export const timeOffReducer = (state: TimeOffState, action: TimeOffAction): TimeOffState => {
  const { lists } = state;
  switch (action.type) {
    case 'pageLoaded': {
      const loaded = lists[action.segment]?.items.slice(0, action.offset) ?? [];
      return {
        ...state,
        lists: { ...lists, [action.segment]: { items: [...loaded, ...action.items], total: action.total } },
      };
    }
    case 'requestSubmitted':
      return { ...state, lists: { ...lists, upcoming: prepend(lists.upcoming, action.request) } };
    case 'requestDecided': {
      const { pending } = lists;
      return {
        ...state,
        lists: {
          ...lists,
          pending: pending && {
            items: pending.items.filter((request) => request.id !== action.request.id),
            total: pending.total - 1,
          },
          decided: prepend(lists.decided, action.request),
        },
      };
    }
  }
};
