/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { MeshNormalMaterial } from 'three';
import { VglMeshNormalMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglMeshNormalMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the MeshNormalMaterial', () => {
    expect(new (Vue.extend(VglMeshNormalMaterial))({ inject }).inst)
      .toBeInstanceOf(MeshNormalMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglMeshNormalMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMeshNormalMaterial))({ inject, propsData: { fog: true } });
    expect(inst).toHaveProperty('fog', true);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMeshNormalMaterial))({ inject });
    const { inst } = vm;
    vm.fog = true;
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMeshNormalMaterial))({ inject });
    vm.fog = true;
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('fog', true);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMeshNormalMaterial))({ inject });
    const { fog } = new MeshNormalMaterial();
    expect(inst).toHaveProperty('fog', fog);
  });
});
