/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { MeshDepthMaterial } from 'three';
import { VglMeshDepthMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglMeshDepthMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the MeshDepthMaterial', () => {
    expect(new (Vue.extend(VglMeshDepthMaterial))({ inject }).inst)
      .toBeInstanceOf(MeshDepthMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglMeshDepthMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMeshDepthMaterial))({ inject, propsData: { fog: true } });
    expect(inst).toHaveProperty('fog', true);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMeshDepthMaterial))({ inject });
    const { inst } = vm;
    vm.fog = true;
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMeshDepthMaterial))({ inject });
    vm.fog = true;
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('fog', true);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMeshDepthMaterial))({ inject });
    const { fog } = new MeshDepthMaterial();
    expect(inst).toHaveProperty('fog', fog);
  });
});
