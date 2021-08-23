import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import glob from 'fast-glob';

export default [{
  file: 'js', format: 'umd', globals: { three: 'THREE' }, name: 'VueGL',
}, {
  file: 'esm.js', format: 'es',
}].flatMap(({ file, ...output }) => [
  { file, ...output },
  { file: `min.${file}`, plugins: [terser()], ...output },
]).map(({ file, ...output }) => ({
  file: `dist/vue-gl.${file}`, ...output,
})).map((output) => ({
  input: 'src/index.js',
  external: ['three'],
  output,
  plugins: [nodeResolve(), babel()],
})).concat([{
  file: 'js', format: 'umd', globals: { three: 'THREE', 'vue-gl': 'VueGL' }, name: 'VueGL',
}, {
  file: 'esm.js', format: 'es',
}].flatMap(({ file, ...output }) => [
  { file, ...output },
  { file: `min.${file}`, plugins: [terser()], ...output },
]).flatMap(({ file, name, ...output }) => glob.sync('examples/**/*.js').map((input) => ({
  input,
  output: {
    file: `dist/${input.slice(0, -3)}.${file}`,
    name: name && `${name}.${input.match(/([^/]+)\.js$/)[1].replace(/^.|-./g, (c) => c.slice(-1).toUpperCase())}`,
    ...output,
  },
  plugins: [nodeResolve(), babel()],
  external: ['three', 'vue-gl'],
}))));
