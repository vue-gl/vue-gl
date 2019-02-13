import Vue from 'vue/dist/vue';
import { ShadowMaterial } from 'three';
import { VglShadowMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglShadowMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the ShadowMaterial', () => {
    expect(new (Vue.extend(VglShadowMaterial))({ inject }).inst).toBeInstanceOf(ShadowMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglShadowMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
