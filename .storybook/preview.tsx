import { setupIonicReact } from '@ionic/react';
import type { Decorator, Preview } from '@storybook/react-vite';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../src/theme/variables.scss';

setupIonicReact();

const withPadding: Decorator = (Story) => (
  <div style={{ maxWidth: 420, padding: 16 }}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withPadding],
};

export default preview;
