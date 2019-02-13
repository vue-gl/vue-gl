import Vue from 'vue/dist/vue';
import { CameraHelper, PerspectiveCamera } from 'three';
import { VglCameraHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglCameraHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    vglNamespace.cameras.testCamera = new PerspectiveCamera(52, undefined, 0.11, 2100);
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the CameraHelper', () => {
    const vm = new (Vue.extend(VglCameraHelper))({ inject, propsData: { camera: 'testCamera' } });
    vm.vglNamespace.beforeRender[0]();
    expect(vm.inst.children[0]).toBeInstanceOf(CameraHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglCameraHelper))({ inject, propsData: { camera: 'testCamera' } }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the state of the inst object should be specified by the camera', () => {
    const vm = new (Vue.extend(VglCameraHelper))({ inject, propsData: { camera: 'testCamera' } });
    const expected = new CameraHelper(new PerspectiveCamera(52, undefined, 0.11, 2100));
    vm.vglNamespace.beforeRender[0]();
    expect(vm.inst.children[0].geometry.getAttribute('position'))
      .toEqual(expected.geometry.getAttribute('position'));
  });
});
