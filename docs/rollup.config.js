import path from 'path';
import copy from 'rollup-plugin-copy';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import generateComponentDocuments from './_rollup/rollup-plugin-generate-component-documents';
import configArray from '../rollup.config';

const [config] = configArray;

Object.assign(config.output, {
  file: path.resolve(__dirname, 'js/vue-gl.js'),
});

config.plugins.push(
  copy({
    targets: [{
      src: [
        require.resolve('vue/dist/vue.min'),
        require.resolve('three/build/three.min'),
        require.resolve('three/examples/fonts/helvetiker_regular.typeface.json'),
      ],
      dest: path.resolve(__dirname, 'js'),
    }],
  }),
  generateComponentDocuments({
    src: path.resolve(__dirname, '../src'),
    dest: path.resolve(__dirname, 'components'),
  }),
);

export default [config, {
  input: path.resolve(__dirname, '_examples/index.js'),
  plugins: [vue(), babel(), resolve(), minify()],
  output: {
    file: path.resolve(__dirname, 'js/examples.js'),
    format: 'iife',
  },
}];
