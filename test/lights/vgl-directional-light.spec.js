import Vue from 'vue/dist/vue';
import { DirectionalLight } from 'three';
import { VglDirectionalLight, VglLight, VglNamespace } from '../../src';

describe('VglDirectionalLight', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the DirectionalLight', () => {
    expect(new (Vue.extend(VglDirectionalLight))({ inject }).inst).toBeInstanceOf(DirectionalLight);
  });
  test('the component should have common props with VglLight', () => {
    expect(Object.keys(new (Vue.extend(VglDirectionalLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglDirectionalLight))({ inject });
    const { color, intensity } = new DirectionalLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
  });
});
