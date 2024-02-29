import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueGL',
      fileName: 'vue-gl',
    },
    rollupOptions: {
      external: ['vue', 'three'],
      output: {
        globals: {
          vue: 'Vue',
          three: 'THREE',
        },
      },
    },
  },
});
