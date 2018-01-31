import path from 'path';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import { version } from 'three/package.json';
import { execSync } from 'child_process';

const baseOpts = {
  input: path.resolve('src/index.js'),
  external: 'three',
  plugins: [babel(), minify()],
};

export default [Object.assign({
  output: {
    file: path.resolve('docs/js/vue-gl.module.js'),
    format: 'es',
    paths: {
      three: `https://unpkg.com/three@${version}/build/three.module.js`,
    },
    intro: execSync('babel-external-helpers -t var'),
  },
}, baseOpts), Object.assign({
  output: {
    file: path.resolve('docs/js/vue-gl.js'),
    format: 'umd',
    name: 'VueGL',
    globals: {
      three: 'THREE',
    },
    intro: execSync('babel-external-helpers -t var'),
  },
}, baseOpts)];
