import type { AnyRequest } from './timeOff';

export const PAGE_SIZE = 10;

export type Page = { items: AnyRequest[]; total: number };
