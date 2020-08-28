import Vue from 'vue/dist/vue';
import { Mesh } from 'three';
import { VglMesh, VglObject3d, VglNamespace } from '../../src';

describe('VglMesh', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Mesh', () => {
    expect(new (Vue.extend(VglMesh))({ inject }).inst).toBeInstanceOf(Mesh);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglMesh))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  // #977
  test('the parsing names should not be called when the material prop is not defined', async () => {
    Vue.config.errorHandler = jest.fn();
    const vm = new (Vue.extend(VglMesh))({ inject });
    vm.$destroy();
    await vm.$nextTick();
    expect(Vue.config.errorHandler).not.toHaveBeenCalled();
  });
});
