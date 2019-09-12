import path from 'path';
import copy from 'rollup-plugin-copy';
import configArray from '../rollup.config';

const [config] = configArray;

Object.assign(config.output, {
  file: path.resolve('docs/js/vue-gl.js'),
});

config.plugins.push(copy({
  targets: [{
    src: require.resolve('vue/dist/vue.min'),
    dest: path.resolve('docs/js'),
  }, {
    src: require.resolve('three/build/three.min'),
    dest: path.resolve('docs/js'),
  }, {
    src: require.resolve('three/examples/fonts/helvetiker_regular.typeface.json'),
    dest: path.resolve('docs/js'),
  }]
}));

export default config;
