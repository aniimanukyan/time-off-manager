import { useEffect, useState } from 'react';

import { fetchPastRequests, fetchUpcomingRequests, submitRequest } from '../data/employee';
import type { NewTimeOffRequest, TimeOffRequest } from '../types/timeOff';

export type Requests = { upcoming?: TimeOffRequest[]; past?: TimeOffRequest[] };

type UseRequests = {
  requests: Requests;
  createRequest: (request: NewTimeOffRequest) => Promise<void>;
};

export const useRequests = (): UseRequests => {
  const [upcoming, setUpcoming] = useState<TimeOffRequest[]>();
  const [past, setPast] = useState<TimeOffRequest[]>();

  useEffect(() => {
    fetchUpcomingRequests().then(setUpcoming);
    fetchPastRequests().then(setPast);
  }, []);

  const createRequest = async (request: NewTimeOffRequest): Promise<void> => {
    const created = await submitRequest(request);
    setUpcoming((prev) => [created, ...(prev ?? [])]);
  };

  return { requests: { upcoming, past }, createRequest };
};
