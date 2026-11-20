import type { Meta, StoryObj } from '@storybook/react-vite';

import StatusBadge from './StatusBadge';

const meta = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  args: { status: 'Pending' },
  argTypes: {
    status: { control: 'inline-radio', options: ['Pending', 'Approved', 'Rejected', 'Cancelled'] },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'StatusBadge',
};
