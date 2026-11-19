import type { ApprovalSegment, TeamRequest } from '../types/timeOff';

import data from './supervisor.json';

export const APPROVALS = data as Record<ApprovalSegment, TeamRequest[]>;
