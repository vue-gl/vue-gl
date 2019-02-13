import Vue from 'vue/dist/vue';
import { Scene } from 'three';
import { VglScene, VglObject3d, VglNamespace } from '../../src';

describe('VglScene', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Scene', () => {
    expect(new (Vue.extend(VglScene))({ inject }).inst).toBeInstanceOf(Scene);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglScene))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
