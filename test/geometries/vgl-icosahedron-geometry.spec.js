import Vue from 'vue/dist/vue';
import { IcosahedronBufferGeometry } from 'three';
import { VglIcosahedronGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglIcosahedronGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the IcosahedronBufferGeometry', () => {
    expect(new (Vue.extend(VglIcosahedronGeometry))({ inject }).inst)
      .toBeInstanceOf(IcosahedronBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglIcosahedronGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglIcosahedronGeometry))({ inject, propsData: { radius: '103.2', detail: '2' } });
    const expected = new IcosahedronBufferGeometry(103.2, 2);
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglIcosahedronGeometry))({ inject });
    const expected = new IcosahedronBufferGeometry();
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
});
