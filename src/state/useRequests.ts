import { useEffect, useRef, useState } from 'react';

import { fetchPastRequests, fetchUpcomingRequests } from '../data/employee';
import type { RequestSegment, TimeOffRequest } from '../types/timeOff';

/** Requests per segment; a segment is missing until its list has loaded. */
export type LoadedRequests = Partial<Record<RequestSegment, TimeOffRequest[]>>;

const FETCHERS: Record<RequestSegment, () => Promise<TimeOffRequest[]>> = {
  upcoming: fetchUpcomingRequests,
  past: fetchPastRequests,
};

/** Loads the given segment the first time it is asked for and keeps every loaded list. */
export const useRequests = (segment: RequestSegment): LoadedRequests => {
  const [loaded, setLoaded] = useState<LoadedRequests>({});
  const started = useRef(new Set<RequestSegment>());

  useEffect(() => {
    if (started.current.has(segment)) return;
    started.current.add(segment);
    FETCHERS[segment]().then((list) => setLoaded((prev) => ({ ...prev, [segment]: list })));
  }, [segment]);

  return loaded;
};
