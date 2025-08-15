import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      // Mock CSS files
      '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
      // Mock specific CSS.ts files
      './Button.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './Input.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './Dialog.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './Tooltip.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './Switch.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './Alert.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      './IconWrapper.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
      '../../styles/theme.css': resolve(__dirname, './src/test/__mocks__/styles.ts'),
    },
  },
});