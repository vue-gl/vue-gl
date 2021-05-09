/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { DirectionalLightHelper, DirectionalLight } from 'three';
import { VglDirectionalLightHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglDirectionalLightHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    vglNamespace.object3ds.set('testLight', new DirectionalLight(0xe2f3b4));
    vglNamespace.object3ds.get('testLight').position.set(3.8, 2.1, -0.5);
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of DirectionalLightelper', () => {
    const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
    expect(vm.inst).toBeInstanceOf(DirectionalLightHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  describe('the state of the inst object should be specified by props', () => {
    test('in case with default values', () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight);
      expect(vm.inst.lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
      expect(vm.inst.lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
      expect(vm.inst.targetLine.geometry.getAttribute('position'))
        .toEqual(expected.targetLine.geometry.getAttribute('position'));
    });
    test('in case props given', () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({
        inject,
        propsData: {
          light: 'testLight',
          color: '#ddf2ee',
          size: '18.7',
        },
      });
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, 18.7, 0xddf2ee);
      expect(vm.inst.lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
      expect(vm.inst.lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
    });
    test('in case size changes', async () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      vm.size = 18.7;
      await Vue.nextTick();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, 18.7);
      expect(vm.inst.lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
    });
    test('in case color changes', async () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      vm.color = '#ddf2ee';
      await Vue.nextTick();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, undefined, 0xddf2ee);
      expect(vm.inst.lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
    });
  });
});
