/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { TetrahedronBufferGeometry } from 'three';
import { VglTetrahedronGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglTetrahedronGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the TetrahedronBufferGeometry', () => {
    expect(new (Vue.extend(VglTetrahedronGeometry))({ inject }).inst)
      .toBeInstanceOf(TetrahedronBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglTetrahedronGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglTetrahedronGeometry))({ inject, propsData: { radius: '103.2', detail: '2' } });
    const expected = new TetrahedronBufferGeometry(103.2, 2);
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglTetrahedronGeometry))({ inject });
    const expected = new TetrahedronBufferGeometry();
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
});
