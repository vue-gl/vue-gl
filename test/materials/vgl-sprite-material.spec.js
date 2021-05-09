/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { SpriteMaterial } from 'three';
import { VglSpriteMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglSpriteMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the SpriteMaterial', () => {
    expect(new (Vue.extend(VglSpriteMaterial))({ inject }).inst).toBeInstanceOf(SpriteMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglSpriteMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglSpriteMaterial))({ inject, propsData: { color: '#8aeda3' } });
    expect(inst.color.getHex()).toBe(0x8aeda3);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglSpriteMaterial))({ inject });
    const { inst } = vm;
    vm.color = '#6751f2';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglSpriteMaterial))({ inject });
    vm.color = '#6751f2';
    await vm.$nextTick();
    expect(vm.inst.color.getHex()).toBe(0x6751f2);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglSpriteMaterial))({ inject });
    const { color } = new SpriteMaterial();
    expect(inst.color.getHex()).toBe(color.getHex());
  });
});
