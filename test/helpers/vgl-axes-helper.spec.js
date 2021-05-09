/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { AxesHelper } from 'three';
import { VglAxesHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglAxesHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of AxesHelper', () => {
    expect(new (Vue.extend(VglAxesHelper))({ inject }).inst).toBeInstanceOf(AxesHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglAxesHelper))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  describe('the state of the inst object should be specified by props', () => {
    test('in case with default values', () => {
      const vm = new (Vue.extend(VglAxesHelper))({ inject });
      expect(vm.inst.geometry.getAttribute('position'))
        .toEqual(new AxesHelper().geometry.getAttribute('position'));
    });
    test('in case size given', () => {
      const vm = new (Vue.extend(VglAxesHelper))({ inject, propsData: { size: '88.73' } });
      expect(vm.inst.geometry.getAttribute('position'))
        .toEqual(new AxesHelper(88.73).geometry.getAttribute('position'));
    });
    test('in case size changes', () => {
      const vm = new (Vue.extend(VglAxesHelper))({ inject });
      vm.size = '12';
      expect(vm.inst.geometry.getAttribute('position'))
        .toEqual(new AxesHelper(12).geometry.getAttribute('position'));
    });
  });
});
