/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { MeshStandardMaterial } from 'three';
import { VglMeshStandardMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglMeshStandardMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the MeshStandardMaterial', () => {
    expect(new (Vue.extend(VglMeshStandardMaterial))({ inject }).inst)
      .toBeInstanceOf(MeshStandardMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglMeshStandardMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMeshStandardMaterial))({ inject, propsData: { color: '#8aeda3' } });
    expect(inst.color.getHex()).toBe(0x8aeda3);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMeshStandardMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMeshStandardMaterial))({ inject });
    vm.color = '#6751f2';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMeshStandardMaterial))({ inject });
    const { color } = new MeshStandardMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
  });
});
