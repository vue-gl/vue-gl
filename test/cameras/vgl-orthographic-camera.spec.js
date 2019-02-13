import Vue from 'vue/dist/vue';
import { OrthographicCamera } from 'three';
import { VglOrthographicCamera, VglCamera, VglNamespace } from '../../src';

describe('VglOrthographicCamera', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the BoxBufferGeometry', () => {
    expect(new (Vue.extend(VglOrthographicCamera))({ inject }).inst)
      .toBeInstanceOf(OrthographicCamera);
  });
  test('the component should have common props with VglGeometry', () => {
    expect(Object.keys(new (Vue.extend(VglOrthographicCamera))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglCamera))({ inject }).$props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglOrthographicCamera))({
      inject,
      propsData: {
        far: '100.85',
        near: '64.24',
        zoom: '1.55',
      },
    });
    expect(inst).toHaveProperty('far', 100.85);
    expect(inst).toHaveProperty('near', 64.24);
    expect(inst).toHaveProperty('zoom', 1.55);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglOrthographicCamera))({ inject });
    const { inst } = vm;
    vm.far = '100.85';
    vm.near = '64.24';
    vm.zoom = '1.55';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglOrthographicCamera))({ inject });
    vm.far = '100.85';
    vm.near = '64.24';
    vm.zoom = '1.55';
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('far', 100.85);
    expect(vm.inst).toHaveProperty('near', 64.24);
    expect(vm.inst).toHaveProperty('zoom', 1.55);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglOrthographicCamera))({ inject });
    const { far, near, zoom } = new OrthographicCamera();
    expect(inst).toHaveProperty('far', far);
    expect(inst).toHaveProperty('near', near);
    expect(inst).toHaveProperty('zoom', zoom);
  });
});
