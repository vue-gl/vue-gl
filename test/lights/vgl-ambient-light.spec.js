import Vue from 'vue/dist/vue';
import { AmbientLight } from 'three';
import { VglAmbientLight, VglLight, VglNamespace } from '../../src';

describe('VglAmbientLight', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the AmbientLight', () => {
    expect(new (Vue.extend(VglAmbientLight))({ inject }).inst).toBeInstanceOf(AmbientLight);
  });
  test('the component should have common props with VglLight', () => {
    expect(Object.keys(new (Vue.extend(VglAmbientLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglAmbientLight))({ inject });
    const { color, intensity } = new AmbientLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
  });
});
