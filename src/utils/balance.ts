import type { Balance } from '../types/timeOff';

export const describeBalance = (balance: Balance): { value: number; unit: string } =>
  balance.limit === null
    ? { value: balance.used, unit: 'used' }
    : { value: balance.available, unit: `of ${balance.limit}` };
