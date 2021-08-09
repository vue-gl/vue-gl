import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    file: 'js', format: 'umd', globals: { three: 'THREE' }, name: 'VueGL',
  },
  { file: 'esm.js', format: 'es' },
].flatMap(({ file, ...output }) => [
  { file, ...output },
  { file: `min.${file}`, plugins: [terser()], ...output },
]).map(({ file, ...output }) => ({
  file: `dist/vue-gl.${file}`, ...output,
})).map((output) => ({
  input: 'src/index.js',
  external: ['three'],
  output,
  plugins: [nodeResolve(), babel()],
}));
