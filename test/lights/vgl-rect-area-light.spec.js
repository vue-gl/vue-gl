import Vue from 'vue/dist/vue';
import { RectAreaLight } from 'three';
import { VglRectAreaLight, VglLight, VglNamespace } from '../../src';

describe('VglRectAreaLight:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the RectAreaLight', () => {
    expect(new (Vue.extend(VglRectAreaLight))({ inject }).inst).toBeInstanceOf(RectAreaLight);
  });
  test('the component should have common props with Light', () => {
    expect(Object.keys(new (Vue.extend(VglRectAreaLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglRectAreaLight))({ inject, propsData: { width: '15.5', height: '21.3' } });
    expect(inst).toHaveProperty('width', 15.5);
    expect(inst).toHaveProperty('height', 21.3);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglRectAreaLight))({ inject });
    const { inst } = vm;
    vm.width = '15.5';
    vm.height = '21.3';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglRectAreaLight))({ inject });
    vm.width = '15.5';
    vm.height = '21.3';
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('width', 15.5);
    expect(vm.inst).toHaveProperty('height', 21.3);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglRectAreaLight))({ inject });
    const {
      color,
      intensity,
      width,
      height,
    } = new RectAreaLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
    expect(inst).toHaveProperty('width', width);
    expect(inst).toHaveProperty('height', height);
  });
});
