import path from 'path';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
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
