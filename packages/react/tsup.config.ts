import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable for now due to numeric property issues
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@ras-ui/tokens'],
  esbuildPlugins: [vanillaExtractPlugin()],
  esbuildOptions(options) {
    options.chunkNames = '[name]-[hash]';
  },
  onSuccess: async () => {
    console.log('✅ Build completed successfully');
  }
});