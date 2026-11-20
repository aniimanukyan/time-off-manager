import type { LeaveRequest } from './timeOff';

export const PAGE_SIZE = 10;

export type Page = { items: LeaveRequest[]; total: number };
