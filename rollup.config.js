import path from 'path';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import { version } from 'three/package.json';

const baseOpts = {
  input: path.resolve('src/index.js'),
  external: 'three',
  plugins: [babel(), minify()],
};

export default [Object.assign({
  output: {
    file: path.resolve('dist/vue-gl.module.js'),
    format: 'es',
    paths: {
      three: `https://unpkg.com/three@${version}/build/three.module.js`,
    },
  },
}, baseOpts), Object.assign({
  output: {
    file: path.resolve('dist/vue-gl.js'),
    format: 'umd',
    name: 'VueGL',
    globals: {
      three: 'THREE',
    },
  },
}, baseOpts)];
