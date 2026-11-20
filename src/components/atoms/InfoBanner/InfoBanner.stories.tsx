import type { Meta, StoryObj } from '@storybook/react-vite';

import InfoBanner from './InfoBanner';

const meta = {
  title: 'Atoms/InfoBanner',
  component: InfoBanner,
  args: {
    title: '5 working days',
    text: 'You will have 7 left after approval.',
    tone: 'ok',
  },
} satisfies Meta<typeof InfoBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'InfoBanner',
};
