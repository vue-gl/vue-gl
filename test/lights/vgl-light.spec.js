import Vue from 'vue/dist/vue';
import { Light } from 'three';
import { VglLight, VglObject3d, VglNamespace } from '../../src';

describe('VglLight', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the HemisphereLight', () => {
    expect(new (Vue.extend(VglLight))({ inject }).inst).toBeInstanceOf(Light);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglLight))({ inject, propsData: { color: '#6751f2', intensity: '0.88' } });
    expect(inst.color.getHex()).toBe(0x6751f2);
    expect(inst).toHaveProperty('intensity', 0.88);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglLight))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.intensity = '0.25';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglLight))({ inject });
    vm.color = '#6751f2';
    vm.intensity = '0.25';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst).toHaveProperty('intensity', 0.25);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglLight))({ inject });
    const { color, intensity } = new Light();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
  });
});
