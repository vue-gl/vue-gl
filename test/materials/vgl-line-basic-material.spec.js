import Vue from 'vue/dist/vue';
import { LineBasicMaterial } from 'three';
import { VglLineBasicMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglLineBasicMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the LineBasicMaterial', () => {
    expect(new (Vue.extend(VglLineBasicMaterial))({ inject }).inst)
      .toBeInstanceOf(LineBasicMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglLineBasicMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglLineBasicMaterial))({
      inject,
      propsData: {
        color: '#8aeda3',
        linewidth: '3.5',
        linecap: 'butt',
        linejoin: 'miter',
      },
    });
    expect(inst.color.getHex()).toBe(0x8aeda3);
    expect(inst).toHaveProperty('linewidth', 3.5);
    expect(inst).toHaveProperty('linecap', 'butt');
    expect(inst).toHaveProperty('linejoin', 'miter');
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglLineBasicMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.linewidth = '3.5';
    vm.linecap = 'butt';
    vm.linejoin = 'miter';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglLineBasicMaterial))({ inject });
    vm.color = '#6751f2';
    vm.linewidth = '4.88';
    vm.linecap = 'square';
    vm.linejoin = 'bevel';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst).toHaveProperty('linewidth', 4.88);
    expect(vm.inst).toHaveProperty('linecap', 'square');
    expect(vm.inst).toHaveProperty('linejoin', 'bevel');
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglLineBasicMaterial))({ inject });
    const {
      color,
      linewidth,
      linecap,
      linejoin,
    } = new LineBasicMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('linewidth', linewidth);
    expect(inst).toHaveProperty('linecap', linecap);
    expect(inst).toHaveProperty('linejoin', linejoin);
  });
});
