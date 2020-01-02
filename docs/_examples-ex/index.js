/* globals Vue */

import VglObjLoaderExample from './loaders/vgl-obj-loader.vue';

const examples = {
  VglObjLoaderExample,
};

Object.entries(examples).forEach(([name, component]) => Vue.component(name, component));
