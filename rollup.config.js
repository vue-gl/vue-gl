import path from 'path';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import { peerDependencies } from './package.json';

const config = {
  input: path.resolve('src/index.js'),
  external: 'three',
  plugins: [babel(), minify()],
  output: {
    file: path.resolve('dist/vue-gl.js'),
    name: 'VueGL',
    format: 'umd',
    globals: { three: 'THREE' },
  },
};

export default [config, {
  ...config,
  output: {
    file: path.resolve('dist/vue-gl.module.js'),
    format: 'es',
    paths: { three: `//unpkg.com/three@${peerDependencies.three}/build/three.module.js` },
  },
}];
