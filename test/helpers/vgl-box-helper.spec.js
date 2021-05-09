/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { BoxHelper, SphereBufferGeometry, Mesh } from 'three';
import { VglBoxHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglBoxHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    vglNamespace.object3ds.set('testSphere', new Mesh(new SphereBufferGeometry(5.4, 31.3, 30.9)));
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the BoxHelper', () => {
    expect(new (Vue.extend(VglBoxHelper))({ inject }).inst).toBeInstanceOf(BoxHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglBoxHelper))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  describe('the state of the inst object should be specified by props', () => {
    test('in case with default values', () => {
      const vm = new (Vue.extend(VglBoxHelper))({ inject, propsData: { object: 'testSphere' } });
      const expected = new BoxHelper(new Mesh(new SphereBufferGeometry(5.4, 31.3, 30.9)));
      expect(vm.inst.geometry)
        .toHaveProperty('attributes', expected.geometry.attributes);
      expect(vm.inst.material).toHaveProperty('color', expected.material.color);
    });
    test('in case color given', () => {
      const vm = new (Vue.extend(VglBoxHelper))({ inject, propsData: { object: 'testSphere', color: '#842f71' } });
      const expected = new BoxHelper(new Mesh(new SphereBufferGeometry(5.4, 31.3, 30.9)), 0x842f71);
      expect(vm.inst.material).toHaveProperty('color', expected.material.color);
    });
    test('in case color changes', () => {
      const vm = new (Vue.extend(VglBoxHelper))({ inject, propsData: { object: 'testSphere' } });
      vm.color = '#842f71';
      const expected = new BoxHelper(new Mesh(new SphereBufferGeometry(5.4, 31.3, 30.9)), 0x842f71);
      expect(vm.inst.material).toHaveProperty('color', expected.material.color);
    });
  });
});
