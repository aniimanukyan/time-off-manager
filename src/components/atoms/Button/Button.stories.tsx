import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    label: 'Submit request',
    variant: 'primary',
    iconOnly: false,
    full: false,
    disabled: false,
    type: 'button',
  },
  argTypes: {
    icon: { control: 'select', options: ['none', 'plus', 'back'], mapping: { none: undefined } },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Button',
};
