/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { PointsMaterial } from 'three';
import { VglPointsMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglPointsMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the PointsMaterial', () => {
    expect(new (Vue.extend(VglPointsMaterial))({ inject }).inst).toBeInstanceOf(PointsMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglPointsMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglPointsMaterial))({
      inject,
      propsData: {
        color: '#8aeda3',
        size: '4.22',
        attenuation: true,
      },
    });
    expect(inst.color.getHex()).toBe(0x8aeda3);
    expect(inst).toHaveProperty('size', 4.22);
    expect(inst).toHaveProperty('sizeAttenuation', true);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglPointsMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.size = '4.22';
    vm.attenuation = true;
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglPointsMaterial))({ inject });
    vm.color = '#6751f2';
    vm.size = '4.22';
    vm.attenuation = true;
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst).toHaveProperty('size', 4.22);
    expect(vm.inst).toHaveProperty('sizeAttenuation', true);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglPointsMaterial))({ inject });
    const {
      color,
      size,
      sizeAttenuation,
    } = new PointsMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('size', size);
    expect(inst).toHaveProperty('sizeAttenuation', sizeAttenuation);
  });
});
