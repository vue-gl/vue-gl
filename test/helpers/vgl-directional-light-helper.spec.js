import Vue from 'vue/dist/vue';
import { DirectionalLightHelper, DirectionalLight } from 'three';
import { VglDirectionalLightHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglDirectionalLightHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    vglNamespace.object3ds.testLight = new DirectionalLight(0xe2f3b4);
    vglNamespace.object3ds.testLight.position.set(3.8, 2.1, -0.5);
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of DirectionalLightelper', () => {
    const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
    vm.vglNamespace.beforeRender[0]();
    expect(vm.inst.children[0]).toBeInstanceOf(DirectionalLightHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  describe('the state of the inst object should be specified by props', () => {
    test('in case with default values', () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      vm.vglNamespace.beforeRender[0]();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight);
      expect(vm.inst.children[0].lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
      expect(vm.inst.children[0].lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
      expect(vm.inst.children[0].targetLine.geometry.getAttribute('position'))
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
      vm.vglNamespace.beforeRender[0]();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, 18.7, 0xddf2ee);
      expect(vm.inst.children[0].lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
      expect(vm.inst.children[0].lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
    });
    test('in case size changes', () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      vm.vglNamespace.beforeRender[0]();
      vm.size = 18.7;
      vm.vglNamespace.beforeRender[0]();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, 18.7);
      expect(vm.inst.children[0].lightPlane.geometry.getAttribute('position'))
        .toEqual(expected.lightPlane.geometry.getAttribute('position'));
    });
    test('in case color changes', () => {
      const vm = new (Vue.extend(VglDirectionalLightHelper))({ inject, propsData: { light: 'testLight' } });
      vm.vglNamespace.beforeRender[0]();
      vm.color = '#ddf2ee';
      vm.vglNamespace.beforeRender[0]();
      const expectedLight = new DirectionalLight(0xe2f3b4);
      expectedLight.position.set(3.8, 2.1, -0.5);
      const expected = new DirectionalLightHelper(expectedLight, undefined, 0xddf2ee);
      expect(vm.inst.children[0].lightPlane.material)
        .toHaveProperty('color', expected.lightPlane.material.color);
    });
  });
});
