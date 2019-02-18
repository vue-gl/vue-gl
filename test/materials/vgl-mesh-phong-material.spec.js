import Vue from 'vue/dist/vue';
import { MeshPhongMaterial } from 'three';
import { VglMeshPhongMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglMeshPhongMaterial:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the MeshPhongMaterial', () => {
    expect(new (Vue.extend(VglMeshPhongMaterial))({ inject }).inst)
      .toBeInstanceOf(MeshPhongMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglMeshPhongMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMeshPhongMaterial))({
      inject,
      propsData: {
        color: '#8aeda3',
        specular: '#18283e',
        shininess: '44',
      },
    });
    expect(inst.color.getHex()).toBe(0x8aeda3);
    expect(inst.specular.getHex()).toBe(0x18283e);
    expect(inst).toHaveProperty('shininess', 44);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMeshPhongMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.specular = '#18283e';
    vm.shininess = '44';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMeshPhongMaterial))({ inject });
    vm.color = '#6751f2';
    vm.specular = '#18283e';
    vm.shininess = '44';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst.specular.getHex()).toBe(0x18283e);
    expect(vm.inst).toHaveProperty('shininess', 44);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMeshPhongMaterial))({ inject });
    const { color, specular, shininess } = new MeshPhongMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst.specular.getHex()).toBe(specular.getHex());
    expect(inst).toHaveProperty('shininess', shininess);
  });
});
