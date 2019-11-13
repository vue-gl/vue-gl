import Vue from 'vue/dist/vue';
import { LineDashedMaterial } from 'three';
import { VglLineDashedMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglLineDashedMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the LineDashedMaterial', () => {
    expect(new (Vue.extend(VglLineDashedMaterial))({ inject }).inst)
      .toBeInstanceOf(LineDashedMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglLineDashedMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglLineDashedMaterial))({
      inject,
      propsData: {
        color: '#8aeda3',
        linewidth: '3.5',
        dashSize: '2.3',
        gapSize: '0.8',
      },
    });
    expect(inst.color.getHex()).toBe(0x8aeda3);
    expect(inst).toHaveProperty('linewidth', 3.5);
    expect(inst).toHaveProperty('dashSize', 2.3);
    expect(inst).toHaveProperty('gapSize', 0.8);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglLineDashedMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    vm.linewidth = '3.5';
    vm.dashSize = '2.3';
    vm.gapSize = '0.8';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglLineDashedMaterial))({ inject });
    vm.color = '#6751f2';
    vm.linewidth = '4.88';
    vm.dashSize = '2.3';
    vm.gapSize = '0.8';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
    expect(vm.inst).toHaveProperty('linewidth', 4.88);
    expect(vm.inst).toHaveProperty('dashSize', 2.3);
    expect(vm.inst).toHaveProperty('gapSize', 0.8);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglLineDashedMaterial))({ inject });
    const {
      color,
      linewidth,
      dashSize,
      gapSize,
    } = new LineDashedMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('linewidth', linewidth);
    expect(inst).toHaveProperty('dashSize', dashSize);
    expect(inst).toHaveProperty('gapSize', gapSize);
  });
});
