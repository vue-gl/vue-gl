/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { PointLight } from 'three';
import { VglPointLight, VglLight, VglNamespace } from '../../src';

describe('VglPointLight', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the PointLight', () => {
    expect(new (Vue.extend(VglPointLight))({ inject }).inst).toBeInstanceOf(PointLight);
  });
  test('the component should have common props with Light', () => {
    expect(Object.keys(new (Vue.extend(VglPointLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglPointLight))({ inject, propsData: { distance: '6.33', decay: '3' } });
    expect(inst).toHaveProperty('distance', 6.33);
    expect(inst).toHaveProperty('decay', 3);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglPointLight))({ inject });
    const { inst } = vm;
    vm.distance = '5.44';
    vm.decay = '4';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglPointLight))({ inject });
    vm.distance = '5.44';
    vm.decay = '4';
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('distance', 5.44);
    expect(vm.inst).toHaveProperty('decay', 4);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglPointLight))({ inject });
    const {
      color,
      intensity,
      distance,
      decay,
    } = new PointLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
    expect(inst).toHaveProperty('distance', distance);
    expect(inst).toHaveProperty('decay', decay);
  });
});
