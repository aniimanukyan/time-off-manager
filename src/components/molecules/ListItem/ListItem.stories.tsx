import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { LEAVE_TYPES } from '../../../types/timeOff';

import ListItem from './ListItem';

const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
  args: {
    id: 'u1',
    employee: '',
    leaveType: 'Vacation',
    start: '2026-12-21',
    end: '2026-12-30',
    days: 8,
    status: 'Pending',
    decision: '',
    onSelect: fn(),
  },
  argTypes: {
    employee: { description: 'Leave empty for an own request, fill in for a team request' },
    leaveType: { control: 'select', options: LEAVE_TYPES },
    status: { control: 'select', options: ['Pending', 'Approved', 'Rejected', 'Cancelled'] },
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ListItem',
};
