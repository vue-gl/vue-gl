import path from 'path';
import copy from 'rollup-plugin-copy';
import configArray from '../rollup.config';

const [config] = configArray;

Object.assign(config.output, {
  file: path.resolve('js/vue-gl.js'),
});

config.plugins.push(copy({
  [require.resolve('vue/dist/vue.min')]: path.resolve('js/vue.min.js'),
  [require.resolve('three/build/three.min')]: path.resolve('js/three.min.js'),
  [require.resolve('three/examples/fonts/helvetiker_regular.typeface.json')]: path.resolve('js/helvetiker_regular.typeface.json'),
}));

export default Object.assign({}, config, {
  input: path.resolve('../src/index.js'),
});
