import { useCallback, useReducer, type FC, type ReactNode } from 'react';

import * as api from '../api/timeOff';

import { TimeOffContext, type TimeOffStore } from './TimeOffContext';
import { initialState, timeOffReducer } from './timeOff';

const TimeOffProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timeOffReducer, initialState);
  const { lists } = state;

  const loadList = useCallback<TimeOffStore['loadList']>(
    async (segment) => {
      const offset = lists[segment]?.items.length ?? 0;
      dispatch({ type: 'pageLoaded', segment, offset, ...(await api.fetchPage(segment, offset)) });
    },
    [lists],
  );

  const store: TimeOffStore = {
    ...state,
    loadList,
    submitRequest: async (request) => dispatch({ type: 'requestSubmitted', request: await api.createRequest(request) }),
    decideRequest: async (request, status, decision) =>
      dispatch({ type: 'requestDecided', request: await api.decideRequest(request, status, decision) }),
  };

  return <TimeOffContext value={store}>{children}</TimeOffContext>;
};

export default TimeOffProvider;
