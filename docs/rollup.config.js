import path from 'path';
import copy from 'rollup-plugin-copy';
import generateComponentDocuments from './rollup-plugins/rollup-plugin-generate-component-documents';
import configArray from '../rollup.config';

const [config] = configArray;

Object.assign(config.output, {
  file: path.resolve(__dirname, 'js/vue-gl.js'),
});

config.plugins.push(
  copy({
    targets: [{
      src: require.resolve('vue/dist/vue.min'),
      dest: path.resolve(__dirname, 'js'),
    }, {
      src: require.resolve('three/build/three.min'),
      dest: path.resolve(__dirname, 'js'),
    }, {
      src: require.resolve('three/examples/fonts/helvetiker_regular.typeface.json'),
      dest: path.resolve(__dirname, 'js'),
    }],
  }),
  generateComponentDocuments({
    src: path.resolve(__dirname, '../src'),
    dest: path.resolve(__dirname, 'components'),
  }),
);

export default config;
