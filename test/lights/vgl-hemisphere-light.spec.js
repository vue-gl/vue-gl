import Vue from 'vue/dist/vue';
import { HemisphereLight } from 'three';
import { VglHemisphereLight, VglLight, VglNamespace } from '../../src';

describe('VglHemisphereLight', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the HemisphereLight', () => {
    expect(new (Vue.extend(VglHemisphereLight))({ inject }).inst).toBeInstanceOf(HemisphereLight);
  });
  test('the component should have common props with Light', () => {
    expect(Object.keys(new (Vue.extend(VglHemisphereLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglHemisphereLight))({ inject, propsData: { groundColor: '#6751f2' } });
    expect(inst.groundColor.getHex()).toBe(0x6751f2);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglHemisphereLight))({ inject });
    const { inst } = vm;
    vm.groundColor = '#6751f2';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglHemisphereLight))({ inject });
    vm.groundColor = '#6751f2';
    await vm.$nextTick();
    expect(vm.inst.groundColor.getHex()).toBe(0x6751f2);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglHemisphereLight))({ inject });
    const { color, groundColor, intensity } = new HemisphereLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst.groundColor.getHex()).toBe(groundColor.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
  });
});
