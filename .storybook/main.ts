import type { StorybookConfig } from '@storybook/react-vite';
import type { PluginOption } from 'vite';

const isLegacyPlugin = (plugin: PluginOption): boolean =>
  Boolean(plugin) && typeof plugin === 'object' && 'name' in plugin && plugin.name.startsWith('vite:legacy');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    plugins: (viteConfig.plugins ?? []).flat().filter((plugin) => !isLegacyPlugin(plugin)),
  }),
};

export default config;
