/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { MeshPhysicalMaterial } from 'three';
import { VglMeshPhysicalMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglMeshPhysicalMaterial:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the MeshPhysicalMaterial', () => {
    expect(new (Vue.extend(VglMeshPhysicalMaterial))({ inject }).inst)
      .toBeInstanceOf(MeshPhysicalMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglMeshPhysicalMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMeshPhysicalMaterial))({
      inject,
      propsData: {
        color: '#8aeda3',
        clearcoat: '0.8',
        clearcoatRoughness: '0.7',
        reflectivity: '0.4',
      },
    });
    expect(inst.color.getHex()).toBe(0x8aeda3);
    expect(inst).toHaveProperty('clearcoat', 0.8);
    expect(inst).toHaveProperty('clearcoatRoughness', 0.7);
    expect(inst).toHaveProperty('reflectivity', 0.4);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMeshPhysicalMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.clearcoat = '0.8';
    vm.clearcoatRoughness = '0.7';
    vm.reflectivity = '0.4';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMeshPhysicalMaterial))({ inject });
    vm.color = '#6751f2';
    vm.clearcoat = '0.8';
    vm.clearcoatRoughness = '0.7';
    vm.reflectivity = '0.4';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst).toHaveProperty('clearcoat', 0.8);
    expect(vm.inst).toHaveProperty('clearcoatRoughness', 0.7);
    expect(vm.inst).toHaveProperty('reflectivity', 0.4);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMeshPhysicalMaterial))({ inject });
    const {
      color, clearcoat, clearcoatRoughness, reflectivity,
    } = new MeshPhysicalMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('clearcoat', clearcoat);
    expect(inst).toHaveProperty('clearcoatRoughness', clearcoatRoughness);
    expect(inst).toHaveProperty('reflectivity', reflectivity);
  });
});
