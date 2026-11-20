import type { Meta, StoryObj } from '@storybook/react-vite';

import { LEAVE_TYPES, type Balance, type LeaveType } from '../../../types/timeOff';

import BalanceCard from './BalanceCard';

type BalanceCardStoryArgs = {
  leaveType: LeaveType;
  unlimited: boolean;
  limit: number;
  available: number;
  used: number;
  progress: number;
};

const meta = {
  title: 'Molecules/BalanceCard',
  args: {
    leaveType: 'Vacation',
    unlimited: false,
    limit: 25,
    available: 12,
    used: 2,
    progress: 0.48,
  },
  argTypes: {
    leaveType: { control: 'inline-radio', options: LEAVE_TYPES },
    unlimited: { description: 'Shows days used instead of days available out of the limit' },
    limit: { if: { arg: 'unlimited', truthy: false } },
    available: { if: { arg: 'unlimited', truthy: false } },
    used: { if: { arg: 'unlimited' } },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
  render: ({ leaveType, unlimited, limit, available, used, progress }) => {
    const balance: Balance = unlimited
      ? { leaveType, progress, limit: null, used }
      : { leaveType, progress, limit, available };

    return <BalanceCard {...balance} />;
  },
} satisfies Meta<BalanceCardStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'BalanceCard',
};
