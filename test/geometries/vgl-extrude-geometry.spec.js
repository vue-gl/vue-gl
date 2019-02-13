import Vue from 'vue/dist/vue';
import { ExtrudeBufferGeometry } from 'three';
import { VglExtrudeGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglExtrudeGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the ExtrudeBufferGeometry', () => {
    expect(new (Vue.extend(VglExtrudeGeometry))({ inject }).inst)
      .toBeInstanceOf(ExtrudeBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglExtrudeGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
