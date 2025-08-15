import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    '../../react/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"), 
    getAbsolutePath("@storybook/addon-docs"), 
    getAbsolutePath("@storybook/addon-a11y")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  viteFinal: async (config) => {
    // Add vanilla-extract plugin
    config.plugins?.push(vanillaExtractPlugin());
    
    // Production optimizations
    if (process.env.NODE_ENV === 'production') {
      config.build = {
        ...config.build,
        rollupOptions: {
          ...config.build?.rollupOptions,
          output: {
            ...config.build?.rollupOptions?.output,
            manualChunks: {
              vendor: ['react', 'react-dom'],
              storybook: ['@storybook/react-vite', '@storybook/addon-docs'],
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      };
    }
    
    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}