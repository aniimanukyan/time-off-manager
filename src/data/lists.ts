import { PAGE_SIZE, type Page } from '../types/pagination';
import type { AnyRequest, Segment } from '../types/timeOff';

import { REQUESTS } from './employee';
import { mockResponse } from './mockResponse';
import { APPROVALS } from './supervisor';

const LISTS: Record<Segment, AnyRequest[]> = { ...REQUESTS, ...APPROVALS };

export const fetchList = (segment: Segment, offset: number): Promise<Page> =>
  mockResponse({ items: LISTS[segment].slice(offset, offset + PAGE_SIZE), total: LISTS[segment].length });
